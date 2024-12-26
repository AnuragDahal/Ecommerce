import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Settings = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Generate the dynamic title based on the current path
    const getTitle = () => {
        if (location.pathname === "/settings/change-password") {
            return (
                <div>
                    <button className="" onClick={() => navigate("/settings")}>
                        Settings
                    </button>{" "}
                    / <button className="text-blue-600">Change Password</button>
                </div>
            );
        }
        if (location.pathname === "/settings/upgrade-account") {
            return (
                <div>
                    <button onClick={() => navigate("/settings")}>
                        Settings
                    </button>{" "}
                    / <button className="text-blue-600">Upgrade Account</button>
                </div>
            );
        }
        return "Settings";
    };

    // Handle navigation
    const handleNavigation = (path:any) => {
        if (location.pathname === path) {
            // If already on the selected path, navigate back to "/settings"
            navigate("/settings");
        } else {
            navigate(path);
        }
    };

    return (
        <section className="p-6">
            {/* Dynamic Title */}
            <h1 className="text-xl font-bold ">{getTitle()}</h1>
            <div className="border-2"></div>
            <main>
                {/* Navigation List */}
                {location.pathname === "/settings" && (
                    <ul className="mt-4 space-y-4">
                        <li
                            className="font-semibold cursor-pointer bg-muted p-2 rounded-lg hover:bg-gray-200"
                            onClick={() =>
                                handleNavigation("/settings/change-password")
                            }
                        >
                            Change Password
                        </li>
                        <li
                            className="font-semibold cursor-pointer bg-muted p-2 rounded-lg hover:bg-gray-200"
                            onClick={() =>
                                handleNavigation("/settings/upgrade-account")
                            }
                        >
                            Upgrade Account
                        </li>
                    </ul>
                )}
                {/* Outlet for Nested Routes */}
                <Outlet />
            </main>
        </section>
    );
};

export default Settings;
