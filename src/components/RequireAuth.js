import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log(auth);
  console.log(allowedRoles);
  console.log(localStorage);

  // return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
  return localStorage.roles === allowedRoles[0] ? (
    <Outlet />
  ) : localStorage?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
