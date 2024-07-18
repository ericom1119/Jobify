import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addJob } from "../actions/jobActions";
import { useNavigate, Link } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import { Box } from "@mui/material";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const AddJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    company: "",
    location: "",
    salary: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addJob(jobData));
    Swal.fire({
      title: "Success!",
      text: "Job successfully saved!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/Managejobs");
    });
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="d-flex flex-column mt-5 justify-content-center align-items-center w-100">
          <div className="add-border">
            <h1>Add Job</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  placeholder="Job Title"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  placeholder="Job Description"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="requirements"
                  value={jobData.requirements}
                  onChange={handleChange}
                  placeholder="Job Requirements"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="company"
                  value={jobData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="salary"
                  value={jobData.salary}
                  onChange={handleChange}
                  placeholder="Salary"
                  required
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

export default AddJob;
