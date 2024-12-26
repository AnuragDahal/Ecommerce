import { Truck, CreditCard, ShoppingCart } from "lucide-react";

const PromoBanner = () => {
    return (
        <section className="bg-primary text-primary-foreground py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-around items-center">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <Truck className="w-8 h-8 mr-3" />
                        <div>
                            <h3 className="font-semibold">Free Shipping</h3>
                            <p className="text-sm">On orders over $50</p>
                        </div>
                    </div>
                    <div className="flex items-center mb-4 sm:mb-0">
                        <CreditCard className="w-8 h-8 mr-3" />
                        <div>
                            <h3 className="font-semibold">Secure Payments</h3>
                            <p className="text-sm">100% protected payments</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ShoppingCart className="w-8 h-8 mr-3" />
                        <div>
                            <h3 className="font-semibold">24/7 Support</h3>
                            <p className="text-sm">Dedicated support</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoBanner;
