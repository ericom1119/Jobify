import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../actions/jobActions";
import { useParams, Link } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";

const ViewJob = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);

  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    const job = jobs.find((job) => job._id === id);
    if (job) {
      setJobData(job);
    } else {
      setJobData(null);
    }
  }, [jobs, id]);

  if (jobData === null) return <div>Job not found or loading...</div>;

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="d-flex flex-column mt-5 justify-content-center align-items-center w-100">
          <div className="view-border">
            <h1>View Job</h1>
            <div className="mb-3">
              <strong>Title:</strong> {jobData.title}
            </div>
            <div className="mb-3">
              <strong>Description:</strong> {jobData.description}
            </div>
            <div className="mb-3">
              <strong>Requirements:</strong> {jobData.requirements}
            </div>
            <div className="mb-3">
              <strong>Company:</strong> {jobData.company}
            </div>
            <div className="mb-3">
              <strong>Location:</strong> {jobData.location}
            </div>
            <div className="mb-3">
              <strong>Salary:</strong> {jobData.salary}
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <Link to="/manageJobs">
                <Button variant="primary" className="mt-3">
                  Back to Job List
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ViewJob;
