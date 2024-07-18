const Company = require("../models/Company");

module.exports.addCompany = (req, res) => {
  if (!req.body.email.includes("@")) {
    return res.status(400).send({ error: "Email invalid" });
  }

  Company.findOne({ name: req.body.name })
    .then((existingName) => {
      if (existingName) {
        return res.status(409).send({ error: "Company name already exists" });
      }

      let newData = {
        name: req.body.name,
        address: req.body.address,
        contactNo: req.body.contactNo,
        email: req.body.email,
      };

      const newCompany = new Company(newData);

      newCompany
        .save()
        .then((result) => {
          res.status(201).send({ message: "Company added successfully" });
        })
        .catch((err) => {
          console.error("Error in saving: ", err);
          res.status(500).send({ error: "Error in saving Company" });
        });
    })
    .catch((err) => {
      console.error("Error in checking existing company name: ", err);
      res
        .status(500)
        .send({ error: "Error in checking existing company name" });
    });
};

module.exports.getAllCompany = (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      error: "Unauthorized: Only admin users can access this endpoint",
    });
  }

  Company.find()
    .then((jobs) => {
      res.status(200).json(jobs);
    })
    .catch((err) => {
      console.error("Error in retrieving Company:", err);

      res
        .status(500)
        .json({ error: "Internal Server Error: Unable to retrieve Company" });
    });
};

module.exports.updateCompany = (req, res) => {
  let companyId = req.params.id;

  if (companyId.startsWith(":id")) {
    companyId = companyId.substring(3);
  }

  const updatedCompanyData = {
    name: req.body.name,
    address: req.body.address,
    contactNo: req.body.contactNo,
    email: req.body.email,
  };

  Company.findByIdAndUpdate(companyId, updatedCompanyData, {
    new: true,
    runValidators: true,
  })
    .then((updatedCompany) => {
      if (!updatedCompany) {
        return res.status(404).json({ error: "Company not found" });
      }
      res
        .status(200)
        .json({ message: "Company updated successfully", updatedCompany });
    })
    .catch((err) => {
      console.error("Error in updating Company:", err);
      res
        .status(500)
        .json({ error: "Internal Server Error: Unable to update Company" });
    });
};

module.exports.deleteCompany = (req, res) => {
  const companyId = req.params.id;

  Company.findByIdAndDelete(companyId)
    .then((deletedCompany) => {
      if (!deletedCompany) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.status(200).json({ message: "Company deleted successfully" });
    })
    .catch((err) => {
      console.error("Error in deleting Company:", err);
      res
        .status(500)
        .json({ error: "Internal Server Error: Unable to delete Company" });
    });
};
