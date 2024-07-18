const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");

module.exports.registerUser = (req, res) => {
  if (!req.body.email.includes("@")) {
    return res.status(400).send({ error: "Email invalid" });
  } else if (!req.body.mobileNo || req.body.mobileNo.length !== 11) {
    return res.status(400).send({ error: "Mobile number invalid" });
  } else if (req.body.password.length < 8) {
    return res
      .status(400)
      .send({ error: "Password must be at least 8 characters" });
  } else {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobileNo: req.body.mobileNo,
      password: bcrypt.hashSync(req.body.password, 10),
      isAdmin: req.body.isAdmin || false,
    });

    return newUser
      .save()
      .then((result) =>
        res.status(201).send({ message: "Registered Successfully" })
      )
      .catch((err) => {
        console.error("Error in saving: ", err);
        return res.status(500).send({ error: "Error in save" });
      });
  }
};

// Get all Users
module.exports.getAllUsers = (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      error: "Unauthorized: Only admin users can access this endpoint",
    });
  }

  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error("Error in retrieving users:", err);

      res
        .status(500)
        .json({ error: "Internal Server Error: Unable to retrieve users" });
    });
};

// Update user role (set as admin)
module.exports.updateUserRole = (req, res) => {
  const userId = req.params.userId;

  User.findByIdAndUpdate(userId, { isAdmin: true }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).send({ error: "User not found" });
      }
      res
        .status(200)
        .send({ message: "User role updated to admin", user: updatedUser });
    })
    .catch((err) =>
      res.status(500).send({ error: "Error in updating user role" })
    );
};

module.exports.loginUser = (req, res) => {
  if (req.body.email.includes("@")) {
    return User.findOne({ email: req.body.email })
      .then((result) => {
        // User does not exist
        if (result == null) {
          return res.status(404).send({ error: "No Email Found" });
        } else {
          const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            result.password
          );
          if (isPasswordCorrect) {
            return res
              .status(200)
              .send({ access: auth.createAccessToken(result) });
            // Password does not match
          } else {
            return res
              .status(401)
              .send({ message: "Email and password do not match" });
          }
        }
      })
      .catch((err) => {
        console.log("Error in find: ", err);
        res.status(500).send({ error: "Error in find" });
      });
  } else {
    return res.status(400).send({ error: "Invalid Email" });
  }
};
