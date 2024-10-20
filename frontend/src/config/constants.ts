import {
    LayoutDashboard,
    Package2,
    Package2Icon,
    Phone,
    UsersIcon,
} from "lucide-react";
export const navList = [
    {
        name: "Dashboard",
        link: "/seller/dashboard/overview",
        icon: LayoutDashboard,
    },
    { name: "Products", link: "/products", icon: Package2 },
    { name: "Categories", link: "/categories", icon: Package2Icon },
    { name: "About", link: "/about", icon: UsersIcon },
    { name: "Contact", link: "/contact", icon: Phone },
];
