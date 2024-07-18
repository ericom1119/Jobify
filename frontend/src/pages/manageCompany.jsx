import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompany, deleteCompany } from "../actions/CompanyActions";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PreviewSharpIcon from "@mui/icons-material/PreviewSharp";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { Box, TablePagination } from "@mui/material";
import Sidenav from "../components/Sidenav";
import { Table, Button } from "react-bootstrap";

const ManageCompany = () => {
  const dispatch = useDispatch();
  const { companies, loading, error } = useSelector((state) => state.company);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const indexOfLastItem = page * rowsPerPage + rowsPerPage;
  const indexOfFirstItem = page * rowsPerPage;

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="d-flex flex-column mt-5 justify-content-center align-items-center w-100">
          <h1>Manage Company</h1>
          <div className="d-flex justify-content-start w-100 mb-2">
            <Link to="/addcompany">
              <Button>Add New</Button>
            </Link>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Company Address</th>
                <th>Contact No</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(companies) && companies.length > 0 ? (
                companies
                  .slice(indexOfFirstItem, indexOfLastItem)
                  .map((company) => (
                    <tr key={company._id}>
                      <td>{company.name}</td>
                      <td>{company.address}</td>
                      <td>{company.contactNo}</td>
                      <td>{company.email}</td>
                      <td style={{ display: "flex", justifyContent: "center" }}>
                        <div>
                          <Tooltip title="Edit">
                            <Link
                              to={`/editCompany/:id${company._id}`}
                              className="mx-2"
                            >
                              <EditOutlinedIcon />
                            </Link>
                          </Tooltip>
                        </div>
                        <div>
                          <Tooltip title="Delete">
                            <DeleteOutlineOutlinedIcon
                              onClick={() =>
                                dispatch(deleteCompany(company._id))
                              }
                            />
                          </Tooltip>
                        </div>
                        <div>
                          <Tooltip title="View">
                            <Link to={`/viewCompany/${company._id}`}>
                              <PreviewSharpIcon />
                            </Link>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5">No Company available</td>
                </tr>
              )}
            </tbody>
          </Table>
          <div className="d-flex justify-content-end w-100 mb-2">
            <TablePagination
              component="div"
              count={companies.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ManageCompany;
