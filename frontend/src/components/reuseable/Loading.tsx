import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
    className?: string;
}

const Loading = ({ className }: LoadingProps) => {
    return (
        <div
            className={cn(
                "h-[100vh] justify-center flex items-center gap-2 w-full text-xl font-bold",
                className
            )}
        >
            <Loader className="animate-spin text-yellow-600" />
            Loading...
        </div>
    );
};

export default Loading;
