import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingProps {
    className?: string;
}

const Loading = ({ className }: LoadingProps) => {
    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm",
                className
            )}
        >
            <div className="relative flex items-center justify-center">
                {/* Outer pulsing ring */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute h-32 w-32 rounded-full border-4 border-primary/20"
                />
                
                {/* Spinning loader */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="h-16 w-16 rounded-full border-t-4 border-r-4 border-primary border-t-transparent"
                />
                
                {/* Center dot */}
                <motion.div
                    animate={{
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute h-4 w-4 rounded-full bg-primary"
                />
            </div>
            
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-lg font-medium tracking-tight text-muted-foreground animate-pulse"
            >
                Preparing your experience...
            </motion.p>
        </div>
    );
};

export default Loading;

