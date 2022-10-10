import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const { authenticated } = useSelector((state) => state.auth);
  return authenticated ? children : <Navigate to="/messenger/login" />;
};

export default ProtectRoute;
