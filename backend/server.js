const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotEnv = require("dotenv");
const connectDb = require("./config/config");
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");
const companyRoutes = require("./routes/company");

dotEnv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDb();

app.use("/api", userRoutes, jobRoutes, companyRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});

module.exports = { app, mongoose };
