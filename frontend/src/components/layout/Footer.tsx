import { Link } from "react-router-dom";
import { ShoppingCart, Facebook, Twitter, Instagram, Github } from "lucide-react";

const footerLinks = [
    {
        title: "Shop",
        links: [
            { label: "All Products", path: "/products" },
            { label: "Categories", path: "/categories" },
            { label: "New Arrivals", path: "/products?sort=new" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", path: "/about" },
            { label: "Contact", path: "/contact" },
            { label: "Terms of Service", path: "/terms" },
            { label: "Privacy Policy", path: "/privacy" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "FAQ", path: "/faq" },
            { label: "Shipping Info", path: "/shipping" },
            { label: "Returns", path: "/returns" },
        ],
    },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="w-full bg-card border-t pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    <div className="lg:col-span-2 space-y-6">
                        <Link to="/" className="flex items-center space-x-2">
                            <ShoppingCart className="h-8 w-8 text-primary" />
                            <span className="text-2xl font-black tracking-tighter">
                                BAZARIO
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-lg max-w-sm leading-relaxed">
                            Your one-stop destination for premium quality products that elevate your lifestyle.
                        </p>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="p-2 rounded-full hover:bg-accent transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full hover:bg-accent transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full hover:bg-accent transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full hover:bg-accent transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {footerLinks.map((section) => (
                        <div key={section.title} className="space-y-4">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-primary/70">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link 
                                            to={link.path} 
                                            className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {currentYear} Bazario. Crafted with passion.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

