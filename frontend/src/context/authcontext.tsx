// src/context/AuthContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the structure of AuthContext
interface AuthContextProps {
    isAuthenticated: boolean;
    token: string | null;
    login: (accessToken: string, refreshToken: string) => void; // Add login to context
    logout: () => void;
}

// Initialize the AuthContext
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

    // Function to refresh tokens using the refresh token
    const refreshTokens = async () => {
        try {
            const refreshToken = Cookies.get("refreshToken");

            if (refreshToken) {
                // Call your API to refresh tokens
                const response = await axios.post(
                    "http://localhost:3000/api/auth/refresh-token",
                    {
                        refreshToken,
                    }
                );

                const { accessToken } = response.data.data;

                // Set accessToken in cookies (if needed) and state
                Cookies.set("accessToken", accessToken, { expires: 10 / 1440 });
                setToken(accessToken);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Failed to refresh token:", error);
            logout();
        } finally {
            setLoading(false); // Set loading to false after token refresh attempt
        }
    };

    // Check if the token exists in cookies
    useEffect(() => {
        const checkTokens = async () => {
            const tokenFromCookie = Cookies.get("accessToken");

            if (tokenFromCookie) {
                setToken(tokenFromCookie);
                setIsAuthenticated(true);
                setLoading(false); // Set loading to false after token check
            } else {
                const refreshToken = Cookies.get("refreshToken");

                if (refreshToken) {
                    // Try refreshing the tokens
                    await refreshTokens();
                } else {
                    // No tokens available, force user to log in
                    logout();
                    setLoading(false); // Set loading to false if no tokens are available
                }
            }
        };
        checkTokens();
    }, []);
    //login function to set tokens in cookies and state
    const login = (accessToken: string, refreshToken: string) => {
        Cookies.set("accessToken", accessToken, { expires: 10 / 1440 });
        Cookies.set("refreshToken", refreshToken, { expires: 1 });

        setToken(accessToken);
        setIsAuthenticated(true);
        navigate("/"); // Redirect to home page after login
    };

    // Logout function to remove tokens from cookies and state
    const logout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setToken(null);
        setIsAuthenticated(false);
        navigate("/login"); // Redirect to login page after logout
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while checking authentication
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access AuthContext
export const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
