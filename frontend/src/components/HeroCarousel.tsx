import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ProductType } from "@/types";

const HeroCarousel = ({ products }: { products: ProductType[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [products.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + products.length) % products.length
        );
    };

    return (
        <div className="relative w-full flex justify-center py-4 lg:py-8">
            <div className="relative w-full max-w-6xl overflow-hidden">
                {/* More contained height */}
                <div className="h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh]">
                    {products.map((product: ProductType, index: number) => (
                        <div
                            key={product.id}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                                index === currentIndex
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        >
                            <div className="relative w-full h-full">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-full h-full object-cover object-center rounded-lg shadow-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-lg" />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center px-4 sm:px-6 md:px-8 max-w-3xl mx-auto">
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
                                            {product.title}
                                        </h2>
                                        <p className="text-white/90 mb-6 text-sm sm:text-base max-w-2xl mx-auto hidden sm:block">
                                            {product.description?.slice(0, 100)}
                                            ...
                                        </p>
                                        <Link to={`/products/${product.id}`}>
                                            <Button
                                                size="lg"
                                                variant="cta"
                                                className="text-base px-6 py-2 font-semibold hover:scale-105 transition-transform"
                                            >
                                                Shop Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {products.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? "bg-white w-4"
                                    : "bg-white/50"
                            }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 text-white hover:bg-black/20 transition-colors"
                    onClick={prevSlide}
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 text-white hover:bg-black/20 transition-colors"
                    onClick={nextSlide}
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
};

export default HeroCarousel;
