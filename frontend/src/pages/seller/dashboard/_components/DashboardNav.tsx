import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    FileText,
    BarChart3,
    Settings,
} from "lucide-react";

const menuItems = [
    {
        icon: LayoutDashboard,
        label: "Overview",
        path: "/seller/dashboard/overview",
    },
    {
        icon: ShoppingBag,
        label: "Products",
        path: "/seller/dashboard/manage-products",
    },
    { icon: Package, label: "Orders", path: "/seller/dashboard/view-orders" },
    { icon: FileText, label: "Invoices", path: "/seller/dashboard/invoices" },
    {
        icon: BarChart3,
        label: "Analytics",
        path: "/seller/dashboard/analytics",
    },
    { icon: Settings, label: "Settings", path: "/seller/dashboard/settings" },
];

export function DashboardNav() {
    const location = useLocation();

    return (
        <nav className="grid items-start gap-2">
            {menuItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-lg font-medium hover:bg-accent hover:text-accent-foreground",
                        location.pathname === item.path
                            ? "bg-accent"
                            : "transparent"
                    )}
                >
                    <item.icon className="mr-2 h-6 w-6" />
                    <span>{item.label}</span>
                </Link>
            ))}
        </nav>
    );
}
