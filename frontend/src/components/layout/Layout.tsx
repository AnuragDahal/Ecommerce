// @ts-ignore
import { ShoppingCart } from "lucide-react";

import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Layout = ({ children }: { children: ReactNode }) => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
    </div>
);

export default Layout;
