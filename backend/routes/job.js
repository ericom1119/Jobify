const express = require("express");
const jobController = require("../controllers/job");

const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/addJob", jobController.addJobs);

router.get("/getAlljob", verify, verifyAdmin, jobController.getAllJobs);

router.put("/editJob/:id", verify, verifyAdmin, jobController.updateJob);

router.delete("/deleteJob/:id", verify, verifyAdmin, jobController.deleteJob);

module.exports = router;
