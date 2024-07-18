const express = require("express");
const companyController = require("../controllers/company");

const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/addCompany", companyController.addCompany);

router.get(
  "/getAllcompany",
  verify,
  verifyAdmin,
  companyController.getAllCompany
);

router.put(
  "/editCompany/:id",
  verify,
  verifyAdmin,
  companyController.updateCompany
);

router.delete(
  "/deleteCompany/:id",
  verify,
  verifyAdmin,
  companyController.deleteCompany
);

module.exports = router;
