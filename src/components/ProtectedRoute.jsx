import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

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

  if (!isAdmin) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#fafafa" }}
      >
        <div className="text-center max-w-md">
          <h1 style={{ color: "#8b5e3c" }} className="text-3xl font-bold mb-4">
            Access Denied
          </h1>
          <p style={{ color: "#6b6b6b" }} className="mb-6">
            You do not have permission to access this page. Only administrators
            can access the admin dashboard.
          </p>
          <a
            href="/"
            className="px-6 py-3 rounded-luxury font-semibold text-white inline-block transition-colors"
            style={{ backgroundColor: "#8b5e3c" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#6b4423")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#8b5e3c")}
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
