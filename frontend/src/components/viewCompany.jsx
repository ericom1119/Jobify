import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "../actions/CompanyActions";
import { useParams, Link } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";

const ViewCompany = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);

  const [companyData, setCompanyData] = useState(null);

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

  if (companyData === null) return <div>Company not found or loading...</div>;

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="d-flex flex-column mt-5 justify-content-center align-items-center w-100">
          <div className="view-border">
            <h1>View Company</h1>
            <div className="mb-3">
              <strong>Company Name:</strong> {companyData.name}
            </div>
            <div className="mb-3">
              <strong>Address:</strong> {companyData.address}
            </div>
            <div className="mb-3">
              <strong>Contact No:</strong> {companyData.contactNo}
            </div>
            <div className="mb-3">
              <strong>Company Email:</strong> {companyData.email}
            </div>

            <div className="d-flex justify-content-center align-items-center">
              <Link to="/manageCompany">
                <Button variant="primary" className="mt-3">
                  Back to Company List
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ViewCompany;
