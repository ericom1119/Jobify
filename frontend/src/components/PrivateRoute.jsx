import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return isAuthenticated || token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
