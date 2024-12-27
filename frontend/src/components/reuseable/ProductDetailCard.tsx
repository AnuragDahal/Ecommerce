import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { addtoCart } from "@/services/useUserServices";

// Debounce utility function
export function debounce(func: (...args: any[]) => void, delay: number) {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

interface ProductColor {
    name: string;
    value: string;
}

interface ProductImage {
    color?: string;
    src: string;
}

interface ProductProps {
    productId: string;
    name: string;
    price: number;
    description: string;
    colors?: ProductColor[];
    images: ProductImage[];
    category: string;
    sellerId: string;
}

export default function ProductDetailCard({
    productId,
    sellerId,
    name,
    price,
    description,
    colors,
    images,
    category,
}: ProductProps) {
    const [loading, setLoading] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string>(
        colors ? colors[0].name : ""
    );
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(
        null
    );
    const [mainImage, setMainImage] = useState<string>(images[0].src);

    // Debounced version of quantity setter
    const debouncedSetQuantity = useCallback(
        debounce((value: number) => {
            setQuantity(value);
        }, 300),
        []
    );

    const mutation = useMutation({
        mutationKey: ["addToCart"],
        mutationFn: addtoCart,
        onSuccess: () => {
            setLoading(!loading);
            toast({
                title: "Success",
                description: "Product added to cart",
                variant: "success",
                duration: 5000,
            });
        },
        onError: () => {
            setLoading(!loading);
            toast({
                title: "Error",
                description: "Failed to add product to cart",
                variant: "destructive",
                duration: 5000,
            });
        },
    });

    const handleAddToCart = () => {
        setLoading(!loading);
        mutation.mutate({
            products: [
                {
                    productId,
                    quantity,
                    sellerId,
                    price,
                    color: selectedColor,
                },
            ],
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                    <img
                        src={mainImage}
                        alt={`${name} in ${selectedColor}`}
                        className="rounded-lg object-cover w-full h-auto max-w-[40rem] md:max-w-[25rem] lg:max-w-[45rem]"
                    />
                    <div className="flex gap-3 overflow-x-auto">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image.src}
                                alt={`${name} in ${selectedColor}`}
                                className={`rounded-lg object-cover h-24 border transiton duration-200 ${
                                    activeImageIndex === index
                                        ? "border-2 border-accent-foreground"
                                        : "border-muted-foreground"
                                } hover:cursor-pointer`}
                                onClick={() => (
                                    setMainImage(image.src),
                                    setActiveImageIndex(index)
                                )}
                            />
                        ))}
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold">{name}</h1>
                        <p className="text-3xl font-semibold mt-2">${price}</p>
                        <span className="text-sm text-muted-foreground">
                            + Free Shipping
                        </span>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        {description.slice(0, 100)}...
                    </p>

                    {colors && (
                        <div>
                            <Label htmlFor="color" className="text-lg">
                                Color
                            </Label>
                            <RadioGroup
                                id="color"
                                className="flex space-x-2 mt-2"
                                value={selectedColor}
                                onValueChange={setSelectedColor}
                            >
                                {colors.map((color: ProductColor) => (
                                    <RadioGroupItem
                                        key={color.name}
                                        value={color.name}
                                        id={color.name}
                                        className={`w-8 h-8 rounded-full bg-${color.name}-400`}
                                    />
                                ))}
                            </RadioGroup>
                        </div>
                    )}

                    <div className="flex items-center space-x-4">
                        <div className="relative w-32">
                            <Label htmlFor="quantity" className="text-lg">
                                Quantity
                            </Label>
                            <div className="relative mt-1">
                                <Input
                                    type="text"
                                    id="quantity"
                                    min={1}
                                    value={quantity || ""}
                                    onChange={(e) =>
                                        debouncedSetQuantity(
                                            parseInt(e.target.value) || 1
                                        )
                                    }
                                    className="pr-10 pl-9 text-center text-md font-md"
                                />
                                <Minus
                                    className="absolute top-1/2 left-2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:cursor-pointer"
                                    onClick={() =>
                                        debouncedSetQuantity(
                                            Math.max(quantity - 1, 1)
                                        )
                                    }
                                />
                                <Plus
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:cursor-pointer"
                                    onClick={() =>
                                        debouncedSetQuantity(quantity + 1)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <Button
                                variant={"cta"}
                                size="lg"
                                className="w-full mt-8"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Category: {category}
                    </div>
                </div>
            </div>

            <Tabs defaultValue="description" className="w-full">
                <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="additional">
                        Additional Information
                    </TabsTrigger>
                    <TabsTrigger value="reviews">Reviews (0)</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Product Description
                    </h2>
                    <p className="text-lg">{description}</p>
                </TabsContent>
                <TabsContent value="additional" className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Additional Information
                    </h2>
                    <p className="text-lg">
                        Additional product details and specifications would be
                        listed here. This might include dimensions, materials,
                        care instructions, or any other relevant technical
                        information about the product.
                    </p>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Customer Reviews
                    </h2>
                    <p className="text-lg">
                        No reviews yet. Be the first to review this product!
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    );
}
