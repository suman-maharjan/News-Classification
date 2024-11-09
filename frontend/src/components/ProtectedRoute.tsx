import { Navigate } from "react-router-dom";
import { isLoggedin } from "../utils/login";
import { useAppSelector } from "@/hooks/redux";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{isLoggedin() ? <Navigate replace to="/dashboard" /> : children}</>;
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { loggedIn } = useAppSelector((state) => state.userPreference);

  return (
    <>{isLoggedin() && loggedIn ? children : <Navigate replace to="/" />}</>
  );
};
