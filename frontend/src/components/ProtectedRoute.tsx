import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { _setIsUserLoggedIn } from "@/redux/auth/authSlice";
import { meApi } from "@/utils/apis/authApi";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await meApi();
        dispatch(_setIsUserLoggedIn({ isUserLoggedIn: true }));
      } catch (error) {
        dispatch(_setIsUserLoggedIn({ isUserLoggedIn: false }));
      }
    };
    checkAuthentication();
  }, []);

  return (
    <>{isUserLoggedIn ? <Navigate replace to="/dashboard" /> : children}</>
  );
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

  if (isUserLoggedIn === null) {
    return <div>Loading</div>;
  }

  return <>{isUserLoggedIn ? children : <Navigate replace to="/" />}</>;
};
