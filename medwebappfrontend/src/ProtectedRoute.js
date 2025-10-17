// ProtectedRoute.jsx
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            
            // Check if token is expired
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                return;
            }

            setUserRole(role);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Token validation error:", error);
            localStorage.removeItem("token");
            setIsAuthenticated(false);
        }
    };

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Or your loading component
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    // Check if user has required role
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        return <Navigate to="/Unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;