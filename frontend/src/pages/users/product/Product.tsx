import ProductCard from "@/components/reuseable/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { getProducts } from "@/lib/getproduct";
import { ProductType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Product = () => {
    const [selectedSort, setSelectedSort] = useState("popular");
    const [page, setPage] = useState(1);
    const [price] = useState("low");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const limit = 2;

    const category = queryParams.get("category") || "";

    const { status, data, error } = useQuery({
        queryKey: ["products", { category, page, price, limit }],
        queryFn: () => getProducts({ category, page, price, limit }),
    });

    if (status === "pending") {
        return <div>Loading...</div>;
    }
    if (status === "error") {
        return <span>Error: {error.message}</span>;
    }
    if (!data.data || data.data.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">
                        No Products Found
                    </h2>
                    <p className="text-muted-foreground">
                        Sorry, we couldn't find any products in the{" "}
                        {category || "selected"} category.
                    </p>
                    <Link to="/categories">
                        <Button className="mt-8">Go Back</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">
                        Our Products
                    </h1>

                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <div className="w-full md:w-1/3">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-8"
                                    placeholder="Search products..."
                                    type="search"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 flex items-center gap-3">
                            <h3 className="text-sm font-semibold">Sort By:</h3>
                            <Select
                                defaultValue={selectedSort}
                                onValueChange={setSelectedSort}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue>{selectedSort}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular">
                                        Popular
                                    </SelectItem>
                                    <SelectItem value="newest">
                                        Newest
                                    </SelectItem>
                                    <SelectItem value="high to low">
                                        Price: high to low
                                    </SelectItem>
                                    <SelectItem value="low to high">
                                        Price : low to high
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                        {data &&
                            data.data.map(
                                (product: ProductType, index: number) => (
                                    <ProductCard
                                        key={index}
                                        number={index}
                                        message={product}
                                    />
                                )
                            )}
                    </div>
                    <div className="flex justify-center mt-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <Button
                                        variant={"link"}
                                        disabled={page === 1}
                                    >
                                        <PaginationPrevious
                                            onClick={() =>
                                                setPage((prev) => prev - 1)
                                            }
                                        />
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    {data.data.length <= limit && (
                                        <PaginationLink
                                            isActive={page === 1}
                                            onClick={() => setPage(1)}
                                        >
                                            1
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <Button variant={"link"}>
                                        <PaginationNext
                                            onClick={() =>
                                                setPage((prev) => prev + 1)
                                            }
                                            aria-disabled={
                                                data.data.length < limit
                                            }
                                        />
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Product;
