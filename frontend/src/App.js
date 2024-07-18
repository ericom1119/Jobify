import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import UserLogin from "./pages/userLogin";
import Homepage from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import AddJob from "./components/AddJob";
import EditJob from "./components/EditJob";
import ManageJobs from "./pages/manageJobs";
import ManageCompany from "./pages/manageCompany";
import ViewJob from "./components/ViewJob";
import ViewCompany from "./components/viewCompany";
import AddCompany from "./components/addCompany";
import EditCompany from "./components/editCompany";
import { LOGIN_SUCCESS } from "./actions/userActions";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: LOGIN_SUCCESS, payload: { token } });
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/viewJob/:id"
          element={
            <PrivateRoute>
              <ViewJob />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/addjob"
          element={
            <PrivateRoute>
              <AddJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs/edit/:id"
          element={
            <PrivateRoute>
              <EditJob />
            </PrivateRoute>
          }
        />

        <Route
          path="/addcompany"
          element={
            <PrivateRoute>
              <AddCompany />
            </PrivateRoute>
          }
        />

        <Route
          path="/editCompany/:id"
          element={
            <PrivateRoute>
              <EditCompany />
            </PrivateRoute>
          }
        />

        <Route
          path="/viewCompany/:id"
          element={
            <PrivateRoute>
              <ViewCompany />{" "}
            </PrivateRoute>
          }
        />
        <Route path="/manageJobs" element={<ManageJobs />} />
        <Route path="/manageCompany" element={<ManageCompany />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
