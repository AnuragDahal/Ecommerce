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

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

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

export function DashboardSidebar() {
    const location = useLocation();

    return (
        <Sidebar className="h-full">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg mb-4">
                        AdminPanel
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-4">
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={
                                            location.pathname === item.path
                                        }
                                    >
                                        <Link
                                            to={item.path}
                                            className={cn(
                                                "flex items-center",
                                                location.pathname === item.path
                                                    ? "text-primary"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            <item.icon className="mr-2 h-10 w-10" />
                                            <span className="text-lg font-semibold">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
