import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#fafafa" }}
      >
        <div className="text-center">
          <p style={{ color: "#8b5e3c" }} className="text-lg font-semibold">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserProtectedRoute;
