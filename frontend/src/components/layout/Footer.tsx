import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <footer className="w-full py-6 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                            <ShoppingCart className="h-6 w-6" />
                            <p className="text-center text-sm leading-loose md:text-left">
                                © 2023 ShopNow. All rights reserved.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Link className="text-sm" to="/terms">
                                Terms
                            </Link>
                            <Link className="text-sm" to="/privacy">
                                Privacy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
