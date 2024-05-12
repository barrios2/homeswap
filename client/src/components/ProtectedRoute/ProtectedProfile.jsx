import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLogin } from "../../context/LogInProvider/LogInProvider";

const ProtectedProfile = () => {
  const { isLoggedIn } = useLogin();

  return isLoggedIn ? <Outlet /> : <Navigate to="/user/login" />;
};
export default ProtectedProfile;
