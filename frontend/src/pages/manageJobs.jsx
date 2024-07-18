import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs, deleteJob } from "../actions/jobActions";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PreviewSharpIcon from "@mui/icons-material/PreviewSharp";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { Box, TablePagination } from "@mui/material";
import Sidenav from "../components/Sidenav";
import { Table, Button } from "react-bootstrap";

const ManageJobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchJobs());
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
          <h1>Manage Jobs</h1>
          <div className="d-flex justify-content-start w-100 mb-2">
            <Link to="/addjob">
              <Button>Add New</Button>
            </Link>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Requirements</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(jobs) && jobs.length > 0 ? (
                jobs.slice(indexOfFirstItem, indexOfLastItem).map((job) => (
                  <tr key={job._id}>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.requirements}</td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <div>
                        <Tooltip title="Edit">
                          <Link to={`/jobs/edit/${job._id}`} className="mx-2">
                            <EditOutlinedIcon />
                          </Link>
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip title="Delete">
                          <DeleteOutlineOutlinedIcon
                            onClick={() => dispatch(deleteJob(job._id))}
                          />
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip title="View">
                          <Link to={`/viewJob/${job._id}`}>
                            <PreviewSharpIcon />
                          </Link>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No jobs available</td>
                </tr>
              )}
            </tbody>
          </Table>
          <div className="d-flex justify-content-end w-100 mb-2">
            <TablePagination
              component="div"
              count={jobs.length}
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

export default ManageJobs;
