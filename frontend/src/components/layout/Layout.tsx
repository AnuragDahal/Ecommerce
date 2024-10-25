// @ts-ignore
import { ShoppingCart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const Layout = () => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
            <Outlet />
        </main>
        <Toaster />
        <Footer />
    </div>
);

export default Layout;
