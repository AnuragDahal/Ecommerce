import { Truck, ShieldCheck, Headphones, Zap } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: Truck,
        title: "Fast Delivery",
        description: "Free on orders over $50",
    },
    {
        icon: ShieldCheck,
        title: "Secure Payment",
        description: "100% protected checkout",
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description: "Always here for you",
    },
    {
        icon: Zap,
        title: "Best Value",
        description: "Top quality, best prices",
    },
];

const PromoBanner = () => {
    return (
        <section className="py-12 bg-card border-y">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-accent transition-colors group"
                        >
                            <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromoBanner;

