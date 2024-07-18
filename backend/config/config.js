const mongoose = require("mongoose");

//Connect Database Function
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB Atlas successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
};

module.exports = connectDb;
