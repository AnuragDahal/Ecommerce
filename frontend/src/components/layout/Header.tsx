import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { ModeToggle } from "@/components/themes/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/layout/NavBar";

const Header = () => {
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
                    <Avatar className="hidden md:block">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>

                    {/* Include Navbar for both desktop and mobile navigation */}
                </div>
            </div>
        </header>
    );
};

export default Header;
