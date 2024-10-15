// src/components/ProtectedRoute.tsx
import { useEffect } from "react";
import { useAuthContext } from "@/context/authcontext";
import { useNavigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    // If the user is authenticated, render the children (protected content)
    if (!isAuthenticated) {
        return null; // or you could return a loading spinner if desired
    }

    return <>{children}</>; // Render the protected content
};

export default ProtectedRoute;
