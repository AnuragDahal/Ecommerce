import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Link, Outlet } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { useLocation } from "react-router-dom";

interface NavigationItem {
    path: string;
    label: string;
}

const SideBar = () => {
    const location = useLocation();

    const navigationItems: NavigationItem[] = [
        { path: "/seller/dashboard/overview", label: "Overview" },
        { path: "/seller/dashboard/create-product", label: "Create Product" },
        { path: "/seller/dashboard/view-orders", label: "View Orders" },
        { path: "/seller/dashboard/manage-products", label: "Manage Products" },
        { path: "/seller/dashboard/analytics", label: "Analytics" },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 shadow-md bg-background">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Seller Dashboard</h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="dashboard">
                            <AccordionTrigger>
                                <div className="flex items-center">
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    Dashboard
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <nav className="pl-6 space-y-2">
                                    {navigationItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`
                                                w-full px-3 py-2 rounded-md text-sm
                                                flex items-center transition-colors
                                                hover:bg-accent hover:text-accent-foreground
                                                ${
                                                    isActive(item.path)
                                                        ? "bg-accent text-accent-foreground"
                                                        : "text-muted-foreground"
                                                }
                                            `}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </aside>
            <main className="flex-1 p-8 overflow-auto bg-background">
                <Outlet />
            </main>
        </div>
    );
};

export default SideBar;
