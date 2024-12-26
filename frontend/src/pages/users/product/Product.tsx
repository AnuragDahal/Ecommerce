import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

import ProductCard from "@/components/reuseable/ProductCard";
import Loading from "@/components/reuseable/Loading";
import NetworkError from "@/components/reuseable/NetworkError";
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
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { getProducts } from "@/lib/getproduct";
import { ProductType } from "@/types";

const Product = () => {
    const [selectedSort, setSelectedSort] = useState("popular");
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const limit = 4;

    const category = queryParams.get("category") || "";

    const { status, data } = useQuery({
        queryKey: ["products", { category, limit, searchTerm }],
        queryFn: () =>
            getProducts({
                category,
                price: "low-high",
                limit,
                // search: searchTerm,
            }),
    });

    if (status === "pending") {
        return <Loading className="h-[100vh]" />;
    }

    if (status === "error") {
        return <NetworkError />;
    }

    if (!data.data || data.data.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">
                        No Products Found
                    </h2>
                    <p className="text-muted-foreground">
                        Sorry, we couldn't find any products matching your
                        criteria.
                    </p>
                    <Link to="/categories">
                        <Button className="mt-8">Go Back</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const totalPages = Math.ceil(data.data.length / limit);
    return (
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 flex items-center gap-3">
                        <Select
                            defaultValue={selectedSort}
                            onValueChange={setSelectedSort}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="popular">Popular</SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="price-high-low">
                                    Price: High to Low
                                </SelectItem>
                                <SelectItem value="price-low-high">
                                    Price: Low to High
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                    {data.data.map((product: ProductType, index: number) => (
                        <ProductCard
                            key={product.id}
                            number={index}
                            message={product}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                {page > 1 && (
                                    <PaginationPrevious
                                        onClick={() =>
                                            setPage((prev) =>
                                                Math.max(prev - 1, 1)
                                            )
                                        }
                                    />
                                )}
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        onClick={() => setPage(i + 1)}
                                        isActive={page === i + 1}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                {page < totalPages && (
                                    <PaginationNext
                                        onClick={() =>
                                            setPage((prev) =>
                                                Math.min(prev + 1, totalPages)
                                            )
                                        }
                                    />
                                )}
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </section>
    );
};

export default Product;
