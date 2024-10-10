import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <header className="sticky top-0 z-50 w-full border-b bg-white">
                <div className="container mx-auto px-4 h-14 flex items-center">
                    <div className="mr-4 hidden md:flex">
                        <Link
                            to="/"
                            className="mr-6 flex items-center space-x-2"
                        >
                            <ShoppingCart className="h-6 w-6" />
                            <span className="hidden font-bold sm:inline-block">
                                ShopNow
                            </span>
                        </Link>
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            <Link to="/products">Products</Link>
                            <Link to="/categories">Categories</Link>
                            <Link to="/about">About</Link>
                            <Link to="/contact">Contact</Link>
                        </nav>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <nav className="flex items-center">
                            <Button variant="ghost">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Cart</span>
                            </Button>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
