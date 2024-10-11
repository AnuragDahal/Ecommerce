"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/themes/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const NavList = [
        {
            name: "Products",
            link: "/products",
        },
        {
            name: "Categories",
            link: "/categories",
        },
        {
            name: "About",
            link: "/about",
        },
        {
            name: "Contact",
            link: "/contact",
        },
    ];

    const NavItems = () => (
        <>
            {NavList.map((item, index) => (
                <Link to={item.link} key={index} className="block py-2 md:p-0">
                    {item.name}
                </Link>
            ))}
        </>
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
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <NavItems />
                </nav>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="sr-only">Cart</span>
                    </Button>
                    <ModeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-white">
                            <nav className="flex flex-col space-y-4 mt-4 ">
                                <NavItems />
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;
