import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateJob, fetchJobs } from "../actions/jobActions";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import { Box } from "@mui/material";
import { Form, Button } from "react-bootstrap";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    company: "",
    location: "",
    salary: "",
  });

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    const job = jobs.find((job) => job._id === id);
    if (job) {
      setJobData({
        title: job.title,
        description: job.description,
        requirements: job.requirements,
        company: job.company,
        location: job.location,
        salary: job.salary,
      });
    }
  }, [jobs, id]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateJob(id, jobData));
    navigate("/manageJobs");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="d-flex flex-column mt-5 justify-content-center align-items-center w-100">
          <div className="add-border">
            <h1>Edit Job</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  placeholder="Title"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="requirements"
                  value={jobData.requirements}
                  onChange={handleChange}
                  placeholder="Requirements"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="company"
                  value={jobData.company}
                  onChange={handleChange}
                  placeholder="Company"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                  placeholder="Location"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="salary"
                  value={jobData.salary}
                  onChange={handleChange}
                  placeholder="Salary"
                />
              </Form.Group>
              <div className="d-flex justify-content-center align-items-center">
                <Button className="mt-3" type="submit">
                  Save
                </Button>
                <Link to={`/home`}>
                  <Button variant="danger" className="mx-3 mt-3">
                    Close
                  </Button>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default EditJob;
