import React from "react";
import { Box } from "@mui/material";
import Sidenav from "../components/Sidenav";

const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
        <Box
          className="py-0 mt-2  w-100"
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          <Sidenav />
          <div className="d-flex justify-content-center ms-auto p-5 py-3 mt-3">
            <h2 className="text">Welcome to Jobify Admin Dashboard</h2>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Home;
