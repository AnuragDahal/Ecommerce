import {useEffect, useState} from "react";
import {useAuthContext} from "@/context/authcontext";
import {useNavigate, useLocation} from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {isAuthenticated, getUserRole} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAccess = async () => {
            // Only check authentication for protected routes
            const protectedRoutes = [
                "/complete",
                "/checkout",
                "/cart",
                "/profile",
                "/orders",
                "/seller",
            ];
            const isProtectedRoute = protectedRoutes.some((route) =>
                location.pathname.startsWith(route)
            );

            if (isProtectedRoute && !isAuthenticated) {
                navigate("/login", {replace: true, state: {from: location}});
                return;
            }

            if (isProtectedRoute) {
                try {
                    const role = await getUserRole();
                    if (
                        location.pathname.includes("/seller") &&
                        role !== "seller"
                    ) {
                        navigate("/", {replace: true});
                    }
                } catch (error) {
                    navigate("/login", {replace: true});
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        checkAccess();
    }, [isAuthenticated, navigate, getUserRole, location]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
