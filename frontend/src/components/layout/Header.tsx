import { Link } from "react-router-dom";
import { LogOut, Package, Settings, ShoppingCart, User } from "lucide-react";
import { ModeToggle } from "@/components/themes/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/layout/NavBar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import DesktopNavigation from "./DesktopNavigation";

const Header = () => {
    const desktopSettings = [
        {
            label: "Profile",
            icon: <User />,
            link: "/profile",
        },
        {
            label: "Settings",
            icon: <Settings />,
            link: "/settings",
        },
        {
            label: "My Orders",
            icon: <Package />,
            link: "/orders",
        },
        {
            label: "My Cart",
            icon: <ShoppingCart />,
            link: "/cart",
        },
        {
            label: "Logout",
            icon: <LogOut />,
            link: "/",
        },
    ];
    return (
        <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <ShoppingCart className="h-6 w-6" />
                        <span className="font-bold sm:inline-block">
                            Bazario
                        </span>
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Navbar />
                    <ModeToggle />
                    {/* desktop navigations */}
                    <DesktopNavigation />
                </div>
            </div>
        </header>
    );
};

export default Header;
