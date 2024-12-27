import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import ProductCard from "@/components/reuseable/ProductCard";
import Loading from "@/components/reuseable/Loading";
import NetworkError from "@/components/reuseable/NetworkError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
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
import { useCallback, useState } from "react";
const Product = () => {
    const [selectedSort, setSelectedSort] = useState("low");
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const limit = parseInt(queryParams.get("limit") || "8");
    const category = queryParams.get("category") || "";

    // Derive price and latest directly from selectedSort
    const getQueryParams = (sort: string) => {
        switch (sort) {
            case "high":
                return { latest: false, price: "high" };
            case "low":
                return { latest: false, price: "low" };
            default:
                return { latest: false, price: "low" };
        }
    };

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setSearchTerm(value);
        }, 500),
        []
    );
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value);
        debouncedSearch(value);
    };

    const { latest, price } = getQueryParams(selectedSort);

    const { status, data } = useQuery({
        queryKey: [
            "products",
            { category, limit, page, price, latest, searchTerm },
        ],
        queryFn: () =>
            getProducts({
                latest,
                category,
                price,
                limit,
                page,
                search: searchTerm,
            }),
    });

    if (status === "pending") {
        return <Loading className="h-[100vh]" />;
    }

    if (status === "error") {
        return <NetworkError />;
    }

    if (!data.products || data.products.length === 0) {
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
    const totalPages = Math.ceil(data.total / limit);
    console.log(totalPages);
    console.log(data);
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
                                value={searchInput}
                                onChange={handleSearchChange}
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
                                <SelectItem value="high">
                                    Price: High to Low
                                </SelectItem>
                                <SelectItem value="low">
                                    Price: Low to High
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                    {data.products.map(
                        (product: ProductType, index: number) => (
                            <div className="hover:scale-105 transform transition-all duration-300">
                                <ProductCard
                                    key={product.id}
                                    number={index}
                                    message={product}
                                />
                            </div>
                        )
                    )}
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
