import ProductCard from "@/components/reuseable/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRandomProducts } from "@/lib/getproduct";
import { ProductType } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { title } from "process";
import { useState } from "react";

const Product = () => {
  const [selectedSort, setSelectedSort] = useState("popular");
  const [initialValue, setInitialValue] = useState(2);
  const [finalValue, setFinalValue] = useState(10);

  const { status, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getRandomProducts,
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <span>Error: {error.message}</span>;
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
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
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
              data
                .slice(initialValue, finalValue)
                .map((product: ProductType, index: number) => (
                <ProductCard number={index} message={product} />
                ))}
          </div>
          <div className="flex justify-center mt-8">
            {initialValue > 4 && (
              <Button
                className="mr-2"
                onClick={() => (
                  setFinalValue(initialValue),
                  setInitialValue(initialValue - (finalValue - initialValue))
                )}
              >
                Previous
              </Button>
            )}
            <Button
              className="ml-2"
              onClick={() => (
                setInitialValue(finalValue), setFinalValue(finalValue + 8)
              )}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
