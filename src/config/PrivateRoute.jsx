import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from '../constant/routesConstant';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} />;
}

export default PrivateRoute;

