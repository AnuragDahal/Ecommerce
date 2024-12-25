import { WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface NetworkErrorProps {
    className?: string;
}

const NetworkError = ({ className }: NetworkErrorProps) => {
    return (
        <div
            className={cn(
                "h-[100vh] justify-center flex items-center gap-2 w-full text-xl font-bold",
                className
            )}
        >
            <WifiOff className="text-muted-foreground" size={40} />
            Network Error
        </div>
    );
};

export default NetworkError;
