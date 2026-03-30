import { WifiOff, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NetworkErrorProps {
    className?: string;
    onRetry?: () => void;
}

const NetworkError = ({ className, onRetry }: NetworkErrorProps) => {
    return (
        <div
            className={cn(
                "min-h-[70vh] flex flex-col items-center justify-center p-8 text-center",
                className
            )}
        >
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-destructive/10 rounded-full blur-2xl scale-150" />
                <WifiOff className="relative text-destructive" size={64} />
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight mb-2">
                Connection Lost
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-[450px] mx-auto mb-8">
                We're having trouble connecting to our servers. Please check your internet connection and try again.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button 
                    onClick={onRetry || (() => window.location.reload())}
                    size="lg"
                    className="rounded-full px-8 gap-2 shadow-lg shadow-primary/20"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                </Button>
                
                <Button 
                    variant="ghost"
                    asChild
                    className="rounded-full px-8"
                >
                    <a href="/contact">Report Issue</a>
                </Button>
            </div>
            
            <div className="mt-12 pt-8 border-t w-full max-w-sm">
                <p className="text-sm font-medium text-muted-foreground mb-4">Quick checks:</p>
                <ul className="text-sm text-muted-foreground/80 space-y-2 text-left list-disc list-inside">
                    <li>Is your Wi-Fi or mobile data enabled?</li>
                    <li>Is airplane mode switched off?</li>
                    <li>Maybe try refreshing the page after a few seconds?</li>
                </ul>
            </div>
        </div>
    );
};

export default NetworkError;

