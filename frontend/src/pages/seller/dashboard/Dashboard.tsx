"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { LayoutDashboard } from "lucide-react";
import CreateProduct from "./components/CreateProduct";
import Analytics from "./components/Analytics";
import Orders from "./components/Orders";
import Overview from "./components/Overview";
import ManageProducts from "./components/ManageProducts";

export default function SellerDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return <Overview />;
            case "create-product":
                return <CreateProduct />;
            case "view-orders":
                return <Orders />;
            case "manage-products":
                return <ManageProducts />;
            case "analytics":
                return <Analytics />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 shadow-md">
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
                                <div className="pl-6 space-y-2">
                                    <Button
                                        variant={
                                            activeTab === "overview"
                                                ? "secondary"
                                                : "ghost"
                                        }
                                        className="w-full justify-start"
                                        onClick={() => setActiveTab("overview")}
                                    >
                                        Overview
                                    </Button>
                                    <Button
                                        variant={
                                            activeTab === "create-product"
                                                ? "secondary"
                                                : "ghost"
                                        }
                                        className="w-full justify-start"
                                        onClick={() =>
                                            setActiveTab("create-product")
                                        }
                                    >
                                        Create Product
                                    </Button>
                                    <Button
                                        variant={
                                            activeTab === "view-orders"
                                                ? "secondary"
                                                : "ghost"
                                        }
                                        className="w-full justify-start"
                                        onClick={() =>
                                            setActiveTab("view-orders")
                                        }
                                    >
                                        View Orders
                                    </Button>
                                    <Button
                                        variant={
                                            activeTab === "manage-products"
                                                ? "secondary"
                                                : "ghost"
                                        }
                                        className="w-full justify-start"
                                        onClick={() =>
                                            setActiveTab("manage-products")
                                        }
                                    >
                                        Manage Products
                                    </Button>
                                    <Button
                                        variant={
                                            activeTab === "analytics"
                                                ? "secondary"
                                                : "ghost"
                                        }
                                        className="w-full justify-start"
                                        onClick={() =>
                                            setActiveTab("analytics")
                                        }
                                    >
                                        Analytics
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 overflow-auto">
                <h1 className="text-2xl font-bold mb-4">
                    {activeTab.charAt(0).toUpperCase() +
                        activeTab.slice(1).replace("-", " ")}
                </h1>
                {renderContent()}
            </main>
        </div>
    );
}
