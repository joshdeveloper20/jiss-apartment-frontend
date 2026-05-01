import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BookingSkeleton from "../components/skeletons/BookingSkeleton";

const UserProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <BookingSkeleton />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserProtectedRoute;
