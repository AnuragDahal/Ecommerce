import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search } from "lucide-react";
import { useState } from "react";

const Product = () => {
  const [selectedSort, setSelectedSort] = useState("popular");
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
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  className="pl-8"
                  placeholder="Search products..."
                  type="search"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 flex items-center gap-3">
              <h3 className="text-sm font-semibold">Sort By:</h3>
              <Select defaultValue={selectedSort} onValueChange={setSelectedSort}>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
              <Card key={product}>
                <img
                  src={`https://via.placeholder.com/200x200?text=Product ${product}`}
                  alt={`Product ${product}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Product {product}</h3>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold">
                      ${(Math.random() * 100).toFixed(2)}
                    </span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button className="mr-2">Previous</Button>
            <Button className="ml-2">Next</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
