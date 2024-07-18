import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCompany, fetchCompany } from "../actions/CompanyActions";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import { Box } from "@mui/material";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);

  const [companyData, setCompanyData] = useState({
    name: "",
    address: "",
    contactNo: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  useEffect(() => {
    const validId = id.startsWith(":id") ? id.substring(3) : id;
    if (Array.isArray(companies)) {
      const company = companies.find((company) => company._id === validId);
      if (company) {
        setCompanyData({
          name: company.name,
          address: company.address,
          contactNo: company.contactNo,
          email: company.email,
        });
      } else {
        console.log("Company not found");
      }
    } else {
      console.log("Companies not available");
    }
  }, [companies, id]);

  const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCompany(id, companyData));
    Swal.fire({
      title: "Success!",
      text: "Company successfully updated!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/ManageCompany");
    });
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="d-flex flex-column mt-5 justify-content-center align-items-center w-100">
          <div className="add-border">
            <h1>Edit Company</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  name="name"
                  value={companyData.name}
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="address"
                  value={companyData.address}
                  onChange={handleChange}
                  placeholder="Company Address"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="contactNo"
                  value={companyData.contactNo}
                  onChange={handleChange}
                  placeholder="Contact No"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="email"
                  value={companyData.email}
                  onChange={handleChange}
                  placeholder="Company Email"
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

export default EditCompany;
