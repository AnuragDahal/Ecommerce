// "use client";

import SideBar from "./_components/SideBar";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion";
// import { LayoutDashboard } from "lucide-react";
// import CreateProduct from "./_components/CreateProduct";
// import Orders from "./_components/Orders";
// import Overview from "./_components/Overview";
// import ManageProducts from "./_components/ManageProducts";
// import { useNavigate } from "react-router-dom";
// import Analytics from "./_components/Analytics";

// export default function SellerDashboard() {
//     const [activeTab, setActiveTab] = useState("overview");
//     const [isToggle, setIsToggle] = useState(true);
//     const navigate = useNavigate();

//     const renderContent = () => {
//         switch (activeTab) {
//             case "overview":
//                 return <Overview />;
//             case "create-product":
//                 return <CreateProduct />;
//             case "view-orders":
//                 return <Orders />;
//             case "manage-products":
//                 return <ManageProducts />;
//             case "analytics":
//                 return <Analytics />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="flex h-screen">
//             {/* Sidebar */}
//             {isToggle && (
//                 <aside className="w-64 shadow-md">
//                     <div className="p-4">
//                         <h2 className="text-xl font-bold mb-4">
//                             Seller Dashboard
//                         </h2>
//                         <Accordion type="single" collapsible className="w-full">
//                             <AccordionItem value="dashboard">
//                                 <AccordionTrigger>
//                                     <div className="flex items-center">
//                                         <LayoutDashboard className="mr-2 h-4 w-4" />
//                                         Dashboard
//                                     </div>
//                                 </AccordionTrigger>
//                                 <AccordionContent>
//                                     <div className="pl-6 space-y-2">
//                                         <Button
//                                             variant={
//                                                 activeTab === "overview"
//                                                     ? "secondary"
//                                                     : "ghost"
//                                             }
//                                             className="w-full justify-start"
//                                             onClick={() =>

//                                                 setActiveTab("overview")
//                                             }
//                                         >
//                                             Overview
//                                         </Button>
//                                         <Button
//                                             variant={
//                                                 activeTab === "create-product"
//                                                     ? "secondary"
//                                                     : "ghost"
//                                             }
//                                             className="w-full justify-start"
//                                             onClick={() =>
//                                                 setActiveTab("create-product")
//                                             }
//                                         >
//                                             Create Product
//                                         </Button>
//                                         <Button
//                                             variant={
//                                                 activeTab === "view-orders"
//                                                     ? "secondary"
//                                                     : "ghost"
//                                             }
//                                             className="w-full justify-start"
//                                             onClick={() =>
//                                                 setActiveTab("view-orders")
//                                             }
//                                         >
//                                             View Orders
//                                         </Button>
//                                         <Button
//                                             variant={
//                                                 activeTab === "manage-products"
//                                                     ? "secondary"
//                                                     : "ghost"
//                                             }
//                                             className="w-full justify-start"
//                                             onClick={() =>
//                                                 setActiveTab("manage-products")
//                                             }
//                                         >
//                                             Manage Products
//                                         </Button>
//                                         <Button
//                                             variant={
//                                                 activeTab === "analytics"
//                                                     ? "secondary"
//                                                     : "ghost"
//                                             }
//                                             className="w-full justify-start"
//                                             onClick={() => (
//                                                 setActiveTab("analytics"),
//                                                 navigate(
//                                                     "/seller/dashboard/analytics"
//                                                 )
//                                             )}
//                                         >
//                                             Analytics
//                                         </Button>
//                                     </div>
//                                 </AccordionContent>
//                             </AccordionItem>
//                         </Accordion>
//                     </div>
//                 </aside>
//             )}

//             {/* Main content */}

//             {/* Main content */}
//             <main className="flex-1 p-8 overflow-auto">
//                 <h1 className="text-2xl font-bold mb-4">
//                     {activeTab.charAt(0).toUpperCase() +
//                         activeTab.slice(1).replace("-", " ")}
//                 </h1>
//                 {renderContent()}
//             </main>
//         </div>
//     );
// }

const SellerDashboard = () => {
    return <div></div>;
};

export default SellerDashboard;
