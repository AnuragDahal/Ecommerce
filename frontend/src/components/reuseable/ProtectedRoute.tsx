// src/components/ProtectedRoute.tsx
import { useEffect } from "react";
import { useAuthContext } from "@/context/authcontext";
import { useNavigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, getUserRole } = useAuthContext();
    const navigate = useNavigate();
    const path = "/seller";

    useEffect(() => {
        const checkAuthentication = async () => {
            if (!isAuthenticated) {
                navigate("/login");
            }
            const role = await getUserRole();
            if (role !== "seller" && location.pathname.includes(path)) {
                navigate("/");
            }
        };
        checkAuthentication();
    }, [isAuthenticated, navigate, getUserRole]);

    // If the user is authenticated, render the children (protected content)
    if (!isAuthenticated) {
        return null; // or you could return a loading spinner if desired
    }

    return <>{children}</>; // Render the protected content
};

export default ProtectedRoute;
