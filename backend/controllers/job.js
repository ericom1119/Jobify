const Job = require("../models/Job");

module.exports.addJobs = (req, res) => {
  let newJobData = {
    title: req.body.title,
    description: req.body.description,
    requirements: req.body.requirements,
    company: req.body.company,
    location: req.body.location,
    salary: req.body.salary,
  };

  Job.findOne({ title: req.body.title })
    .then((existingTitle) => {
      if (existingTitle) {
        return res.status(409).send({ error: "Job title already exists" });
      }

      const newJob = new Job(newJobData);

      newJob
        .save()
        .then((result) => {
          res.status(201).send({ message: "Job added successfully" });
        })
        .catch((err) => {
          console.error("Error in saving: ", err);
          res.status(500).send({ error: "Error in saving job" });
        });
    })
    .catch((err) => {
      console.error("Error in checking existing job title:", err);
      res.status(500).send({ error: "Error in checking existing job title" });
    });
};

module.exports.getAllJobs = (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      error: "Unauthorized: Only admin users can access this endpoint",
    });
  }

  Job.find()
    .then((jobs) => {
      res.status(200).json(jobs);
    })
    .catch((err) => {
      console.error("Error in retrieving Jobs:", err);

      res
        .status(500)
        .json({ error: "Internal Server Error: Unable to retrieve Jobs" });
    });
};

module.exports.updateJob = (req, res) => {
  const jobId = req.params.id;
  const updatedJobData = {
    title: req.body.title,
    description: req.body.description,
    requirements: req.body.requirements,
    company: req.body.company,
    location: req.body.location,
    salary: req.body.salary,
  };

  Job.findByIdAndUpdate(jobId, updatedJobData, {
    new: true,
    runValidators: true,
  })
    .then((updatedJob) => {
      if (!updatedJob) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.status(200).json({ message: "Job updated successfully", updatedJob });
    })
    .catch((err) => {
      console.error("Error in updating job:", err);
      res
        .status(500)
        .json({ error: "Internal Server Error: Unable to update job" });
    });
};

module.exports.deleteJob = (req, res) => {
  const jobId = req.params.id;

  Job.findByIdAndDelete(jobId)
    .then((deletedJob) => {
      if (!deletedJob) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.status(200).json({ message: "Job deleted successfully" });
    })
    .catch((err) => {
      console.error("Error in deleting job:", err);
      res
        .status(500)
        .json({ error: "Internal Server Error: Unable to delete job" });
    });
};
