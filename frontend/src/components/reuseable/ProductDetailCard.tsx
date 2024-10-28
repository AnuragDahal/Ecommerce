import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Maximize2, Minus, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { set } from "date-fns";

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
}

export default function ProductDetailCard({
    productId,
    name,
    price,
    description,
    colors,
    images,
    category,
}: ProductProps) {
    const [selectedColor, setSelectedColor] = useState<string>(
        colors ? colors[0].name : ""
    );
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(
        null
    );
    const [mainImage, setMainImage] = useState<string>(images[0].src);
    // const [hoveredImage, setHoveredImage] = useState(null);
    // const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    // const handleMouseMove = (e: any, image: any) => {
    //     const rect = e.target.getBoundingClientRect();
    //     const x = ((e.clientX - rect.left) / rect.width) * 100;
    //     const y = ((e.clientY - rect.top) / rect.height) * 100;
    //     setHoveredImage(image.color);
    //     setCursorPos({ x, y });
    // };

    // const handleMouseLeave = () => {
    //     setHoveredImage(null);
    // };

    const handleAddToCart = () => {
        try {
            const newItem = {
                productId,
                name,
                price,
                quantity,
                image:
                    images.find((img) => img.color === selectedColor)?.src ||
                    images[0].src,
            };

            // Get existing cart items
            const existingCartItems = localStorage.getItem("cartItems");
            let cartItemsArray = [];

            if (existingCartItems) {
                cartItemsArray = JSON.parse(existingCartItems);

                // Ensure cartItemsArray is an array
                if (!Array.isArray(cartItemsArray)) {
                    cartItemsArray = [];
                }
            }

            // Check if item already exists in cart
            const existingItemIndex = cartItemsArray.findIndex(
                (item: any) => item.productId === productId
            );

            if (existingItemIndex !== -1) {
                // Update quantity if item exists
                cartItemsArray[existingItemIndex].quantity += quantity;
            } else {
                // Add new item if it doesn't exist
                cartItemsArray.push(newItem);
            }

            // Save updated cart
            localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));

            // Show success message
            toast({
                variant: "success",
                title: "Added to Cart",
                description: `${quantity} ${name} added to your cart`,
            });
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast({
                title: "Error",
                description: "Failed to add item to cart",
                variant: "destructive",
            });
        }
    };
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Image section remains the same */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                    <img
                        src={mainImage}
                        alt={`${name} in ${selectedColor}`}
                        className="rounded-lg object-cover w-full h-auto max-w-[40rem] md:max-w-[25rem] md:h-[25rem] lg:max-w-[45rem]"
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
                    {/* Product info section */}
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

                    {/* Color selection */}
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

                    {/* Quantity and Add to Cart section - Fixed structure */}
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
                                        setQuantity(
                                            parseInt(e.target.value) || 1
                                        )
                                    }
                                    className="pr-10 pl-9 text-center text-md font-md"
                                />
                                <Minus
                                    className="absolute top-1/2 left-2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:cursor-pointer"
                                    onClick={() =>
                                        setQuantity(Math.max(quantity - 1, 1))
                                    }
                                />
                                <Plus
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:cursor-pointer"
                                    onClick={() => setQuantity(quantity + 1)}
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <Button
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

            {/* Tabs section remains the same */}
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
