import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isLoggedin } from "../utils/login";

export const PublicRoute = ({ children }) => {
  return <>{isLoggedin() ? <Navigate replace to="/dashboard" /> : children}</>;
};

export const ProtectedRoute = ({ children }) => {
  return <>{isLoggedin() ? children : <Navigate replace to="/" />}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
