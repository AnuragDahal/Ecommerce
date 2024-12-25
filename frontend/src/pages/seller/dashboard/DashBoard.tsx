import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebar } from "./_components/DashboardSidebar";
import { DashboardNav } from "./_components/DashboardNav";
import { useState } from "react";

const DashBoard = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    return (
        <div className="flex h-auto w-full flex-col overflow-y-hidden">
            <div className="flex h-16 items-center px-4">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="mr-2 md:hidden"
                            onClick={() => setIsSheetOpen(!isSheetOpen)}
                        >
                            <Menu className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="w-[240px] sm:w-[300px]"
                        onClick={() => setIsSheetOpen(false)}
                    >
                        <DashboardNav />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="hidden md:flex md:w-[200px] flex-col">
                    <DashboardSidebar />
                </aside>
                {/* Main Content */}
                <main className="flex-1 flex justify-center p-4 md:ml-[100px] overflow-hidden">
                    <div className="w-full max-w-4xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashBoard;
