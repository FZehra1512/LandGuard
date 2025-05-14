import AppLoader from "@/components/ui/app-loader";
import { useAuth } from "@/providers/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  const { isUser, userDetails, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while auth is being checked
  if (isLoading) {
    return <AppLoader />;
  }

  // If not authenticated, redirect to login with return path
  if (!isUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but wrong role, redirect to appropriate dashboard
  if (userDetails.userType !== allowedRole) {
    return <Navigate to={userDetails.userType === "admin" ? "/admin" : "/user"} replace />;
  }

  // If authenticated and correct role, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
