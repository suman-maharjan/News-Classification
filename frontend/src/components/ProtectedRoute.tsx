import { Navigate } from "react-router-dom";
import { isLoggedin } from "../utils/login";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{isLoggedin() ? <Navigate replace to="/dashboard" /> : children}</>;
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{isLoggedin() ? children : <Navigate replace to="/" />}</>;
};
