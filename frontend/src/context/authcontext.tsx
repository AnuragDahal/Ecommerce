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
import { useGetRoleService } from "@/services/useAuthService";

interface AuthContextProps {
    isAuthenticated: boolean;
    token: string | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    getUserRole: () => Promise<string | undefined>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiryTime = payload.exp * 1000;
        return Date.now() >= expiryTime;
    } catch (error) {
        console.error("Error parsing token:", error);
        return true;
    }
};

const removeExpiredTokens = () => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken && isTokenExpired(accessToken)) {
        Cookies.remove("accessToken");
        return true;
    }
    return false;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const refreshTokens = async () => {
        try {
            const refreshToken = Cookies.get("refreshToken");

            if (refreshToken) {
                const response = await axios.post(
                    "http://localhost:3000/api/auth/refresh-token",
                    {
                        refreshToken,
                    }
                );

                const { accessToken } = response.data.data;

                Cookies.set("accessToken", accessToken, { expires: 10 });
                setToken(accessToken);
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to refresh token:", error);
            logout();
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let tokenCheckInterval: ReturnType<typeof setInterval>;

        (async () => {
            const tokenFromCookie = Cookies.get("accessToken");

            if (tokenFromCookie) {
                if (isTokenExpired(tokenFromCookie)) {
                    Cookies.remove("accessToken");

                    const refreshToken = Cookies.get("refreshToken");
                    if (refreshToken) {
                        await refreshTokens();
                    } else {
                        logout();
                    }
                } else {
                    setToken(tokenFromCookie);
                    setIsAuthenticated(true);
                }
            } else {
                const refreshToken = Cookies.get("refreshToken");
                if (refreshToken) {
                    await refreshTokens();
                } else {
                    logout();
                }
            }
            setLoading(false);

            // Set up periodic token check after initial authentication check
            tokenCheckInterval = setInterval(() => {
                const isExpired = removeExpiredTokens();
                if (isExpired) {
                    refreshTokens();
                }
            }, 60000);
        })();

        // Cleanup function
        return () => {
            if (tokenCheckInterval) {
                clearInterval(tokenCheckInterval);
            }
        };
    }, []);

    const login = (accessToken: string, refreshToken: string) => {
        if (!isTokenExpired(accessToken)) {
            Cookies.set("accessToken", accessToken, { expires: 10 });
            Cookies.set("refreshToken", refreshToken, { expires: 10 });
            setToken(accessToken);
            setIsAuthenticated(true);
            navigate("/");
        } else {
            console.error("Attempted to login with expired token");
            logout();
        }
    };

    const getUserRole = async () => {
        try {
            const response = await useGetRoleService();
            return response.data.role;
        } catch (error) {
            console.error("Failed to get user role:", error);
            return undefined;
        }
    };

    const logout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setToken(null);
        setIsAuthenticated(false);
        navigate("/login");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, token, logout, login, getUserRole }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
