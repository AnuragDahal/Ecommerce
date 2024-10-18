import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    ShoppingCart,
    Menu,
    User,
    Settings,
    LogOut,
    Heart,
    ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/themes/mode-toggle";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navList } from "@/config/constants";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    // Profile menu items for mobile only
    const profileMenuItems = [
        { name: "My Profile", icon: User, link: "/profile" },
        { name: "My Orders", icon: ShoppingBag, link: "/orders" },
        { name: "Wishlist", icon: Heart, link: "/wishlist" },
        { name: "Settings", icon: Settings, link: "/settings" },
        { name: "Logout", icon: LogOut, link: "/logout" },
    ];
    // Original NavItems component for desktop
    const NavItems = ({ closeMenu }: { closeMenu: () => void }) => (
        <>
            {navList.map((item, index) => (
                <Link
                    to={item.link}
                    key={index}
                    className="flex py-3 px-2 space-x-3 md:p-0 hover:bg-accent rounded-lg"
                    onClick={closeMenu}
                >
                    {item.name}
                </Link>
            ))}
        </>
    );

    // Mobile-only profile section
    const MobileProfileSection = ({ closeMenu }: { closeMenu: () => void }) => (
        <div className="flex flex-col space-y-1">
            {profileMenuItems.map((item, index) => (
                <Link
                    to={item.link}
                    key={index}
                    className="flex items-center px-2 py-3 space-x-3 rounded-md hover:bg-accent transition-colors"
                    onClick={closeMenu}
                >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                </Link>
            ))}
        </div>
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <ShoppingCart className="h-6 w-6" />
                        <span className="font-bold sm:inline-block">
                            ShopNow
                        </span>
                    </Link>
                </div>

                {/* Desktop navigation - unchanged */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <NavItems closeMenu={() => {}} />
                </nav>

                <div className="flex items-center space-x-4">
                    <ModeToggle />
                    <Avatar className="hidden md:block">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={toggleMenu}
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-72">
                            <SheetHeader className="mb-4">
                                <SheetTitle>
                                    <div className="flex items-center space-x-3">
                                        <Avatar>
                                            <AvatarImage src="/placeholder-avatar.jpg" />
                                            <AvatarFallback>UN</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                User Name
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                user@example.com
                                            </span>
                                        </div>
                                    </div>
                                </SheetTitle>
                            </SheetHeader>

                            {/* Mobile Navigation Layout */}
                            <div className="flex flex-col space-y-6">
                                {/* Profile Section */}
                                <div>
                                    <h3 className="px-2 mb-2 text-sm font-semibold text-muted-foreground">
                                        Profile
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
                                    <div className="flex flex-col space-y-1">
                                        <NavItems
                                            closeMenu={() => setIsOpen(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;
