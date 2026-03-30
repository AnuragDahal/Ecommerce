import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Ghost className="w-24 h-24 text-primary opacity-20 absolute -top-12 -right-12 blur-sm" />
            <span className="text-9xl font-black bg-gradient-to-t from-primary to-primary-foreground/40 bg-clip-text text-transparent">
              404
            </span>
          </motion.div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Lost in Space?
          </h1>
          <p className="text-muted-foreground text-lg max-w-[500px] mx-auto">
            Oops! The page you're looking for seems to have vanished into the digital void. Don't worry, we'll help you find your way back.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </div>
          </Button>
          <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/25">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Decorative radial gradient */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_100%)]" />
      </div>
    </div>
  );
};

export default NotFound;


