import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {navList} from "@/config/constants";
import {useAuthContext} from "@/context/authcontext";
import {useGetRoleService} from "@/services/useAuthService";
import {getUserProfile} from "@/services/useUserServices";
import {IFetchedProfile} from "@/types";
import {useQuery} from "@tanstack/react-query";
import Cookies from "js-cookie";
import {LogIn, LogOut, Menu, Settings, ShoppingBag, User} from "lucide-react";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

// NavItems for both desktop and mobile
const NavItems = ({
    closeMenu,
    role,
    isAuthenticated,
}: {
    closeMenu: () => void;
    role: string | undefined;
    isAuthenticated: boolean;
}) => {
    const location = useLocation();

    return (
        <>
            {navList.map((item, index) => {
                const isDashboard =
                    item.name === "Dashboard" &&
                    (!isAuthenticated || role !== "seller");
                if (isDashboard) return null;

                const isActive = location.pathname === item.link;

                return (
                    <Link
                        to={item.link}
                        key={index}
                        className={`flex py-3 px-2 space-x-3 md:p-0 hover:bg-accent text-[16px] rounded-lg ${
                            isActive
                                ? "text-blue-500 text-md font-semibold"
                                : ""
                        }`}
                        onClick={closeMenu}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </>
    );
};

// Mobile-only profile section
const MobileProfileSection = ({closeMenu}: {closeMenu: () => void}) => {
    const {isAuthenticated} = useAuthContext();
    const location = useLocation();
    const profileMenuItems = isAuthenticated
        ? [
              {name: "My Profile", icon: User, link: "/profile"},
              {name: "My Orders", icon: ShoppingBag, link: "/orders"},
              {name: "My Cart", icon: ShoppingBag, link: "/cart"},
              {name: "Settings", icon: Settings, link: "/settings"},
              {name: "Logout", icon: LogOut, link: "/login"},
          ]
        : [{name: "Login", icon: LogIn, link: "/login"}];

    return (
        <div className="flex flex-col space-y-1">
            {profileMenuItems.map((item, index) => {
                const isActive = location.pathname === item.link;

                return (
                    <Link
                        to={item.link}
                        key={index}
                        className={`flex items-center px-2 py-3 space-x-3 rounded-md transition-colors ${
                            isActive
                                ? "text-blue-500 font-semibold"
                                : "hover:bg-accent"
                        }`}
                        onClick={() => {
                            if (item.name === "Logout") {
                                Cookies.remove("accessToken");
                                Cookies.remove("refreshToken");
                            }
                            closeMenu();
                        }}
                    >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                    </Link>
                );
            })}
        </div>
    );
};

const Navbar = () => {
    const {isAuthenticated} = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const [profileData, setProfileData] = useState<IFetchedProfile>({
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
        phoneNumber: "",
        address: "",
    });
    const {data: roleData} = useQuery({
        queryKey: ["user"],
        queryFn: useGetRoleService,
        staleTime: 1000 * 60 * 5,
    });
    const role = roleData?.data?.role;
    const {data} = useQuery({
        queryKey: ["userProfile"],
        queryFn: getUserProfile,
        staleTime: 1000 * 60 * 10,
        enabled: isAuthenticated,
    });

    useEffect(() => {
        if (data) {
            setProfileData({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                avatar: data.avatar,
                phoneNumber: data.phoneNumber,
                address: data.address,
            });
        }
    }, [data]);

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <NavItems
                    closeMenu={() => {}}
                    role={role}
                    isAuthenticated={isAuthenticated}
                />
            </nav>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={toggleMenu}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className={`w-72 transition-all duration-300 ease-in-out ${
                        isOpen
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-full opacity-0"
                    }`}
                >
                    {isAuthenticated ? (
                        <SheetHeader className="mb-4">
                            <SheetTitle>
                                <div className="flex items-center space-x-3">
                                    <Avatar>
                                        <AvatarImage
                                            src={profileData?.avatar}
                                        />
                                        <AvatarFallback>
                                            {profileData.firstName.charAt(0) +
                                                profileData.lastName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium">
                                            {profileData.firstName}
                                            {profileData.lastName}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {profileData.email}
                                        </span>
                                    </div>
                                </div>
                            </SheetTitle>
                        </SheetHeader>
                    ) : null}

                    {/* Mobile Navigation Layout */}
                    <div className="flex flex-col space-y-6">
                        {/* Profile Section */}
                        <div>
                            <h3 className="px-2 mb-2 text-sm font-semibold text-muted-foreground">
                                {isAuthenticated ? "Profile" : "Account"}
                            </h3>
                            <MobileProfileSection
                                closeMenu={() => setIsOpen(false)}
                            />
                        </div>

                        <Separator />

                        {/* Navigation Section */}
                        <div>
                            <h3 className="px-2 mb-2 text-sm font-semibold text-muted-foreground">
                                Menu
                            </h3>
                            <div className="pl-3 flex flex-col space-y-3">
                                <NavItems
                                    closeMenu={() => setIsOpen(false)}
                                    role={role}
                                    isAuthenticated={isAuthenticated}
                                />
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default Navbar;
