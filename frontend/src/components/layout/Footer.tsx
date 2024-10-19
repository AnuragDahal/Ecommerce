import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div>
            <footer className="w-full py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between gap-4 md:flex-row">
                        <div className="flex items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                            <p className="text-center text-md leading-loose md:text-left">
                                &copy; &nbsp;{currentYear} Bazario. All rights
                                reserved.
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
