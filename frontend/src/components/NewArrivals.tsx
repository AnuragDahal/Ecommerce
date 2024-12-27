import { useState } from "react";
import ProductCard from "@/components/reuseable/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductType } from "@/types";

const NewArrivals = ({ products }: { products: Array<ProductType> }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 6;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
    const prevPage = () =>
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

    const currentProducts = products.slice(
        currentPage * productsPerPage,
        (currentPage + 1) * productsPerPage
    );

    return (
        <section className="py-24 px-4 flex flex-col">
            <h2 className="text-4xl font-bold mb-12 text-center">
                New Arrivals
            </h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {currentProducts.map((product: ProductType, index: number) => (
                    <div
                        key={index}
                        className="transform transition duration-300 hover:scale-105"
                    >
                        <ProductCard message={product} number={index} />
                    </div>
                ))}
            </div>
            <div className="mt-12 flex justify-center items-center space-x-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={prevPage}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                    Page {currentPage + 1} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={nextPage}
                    aria-label="Next page"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </section>
    );
};

export default NewArrivals;
