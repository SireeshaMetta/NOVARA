import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (!user.isVerified) {
        return (
            <Navigate
                to="/verify-email-pending"
                state={{ email: user.email }}
                replace
            />
        );
    }

    if (adminOnly && user.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    if (!adminOnly && user.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;
