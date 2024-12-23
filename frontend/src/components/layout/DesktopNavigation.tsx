import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Package, Settings, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const DesktopNavigation = () => {
    // State to control whether the popover is open
    const [popoverOpen, setPopoverOpen] = useState(false);
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
            link: "/login",
        },
    ];
    return (
        <div>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger onClick={() => setPopoverOpen(!popoverOpen)}>
                    <Avatar className="hidden md:block hover:cursor-pointer">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-full space-y-2">
                    {desktopSettings.map((item, index) =>
                        item.label === "Logout" ? (
                            <Link
                                key={index} // Key applied directly to the Link
                                to={item.link}
                                className="flex items-center space-x-2 p-2 hover:bg-muted w-full hover:rounded-lg"
                                onClick={() => {
                                    Cookies.remove("accessToken");
                                    Cookies.remove("refreshToken");
                                    setPopoverOpen(false);
                                }}
                            >
                                {item.icon}
                                <span className="pl-3">{item.label}</span>
                            </Link>
                        ) : (
                            <Link
                                key={index} // Key applied directly to the Link
                                to={item.link}
                                className="flex items-center space-x-2 p-2 hover:bg-muted w-full hover:rounded-lg"
                                onClick={() => setPopoverOpen(false)}
                            >
                                {item.icon}
                                <span className="pl-3">{item.label}</span>
                            </Link>
                        )
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DesktopNavigation;
