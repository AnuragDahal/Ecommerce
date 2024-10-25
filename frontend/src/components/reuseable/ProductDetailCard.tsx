import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Maximize2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductColor {
    name: string;
    value: string;
}

interface ProductImage {
    color?: string;
    src: string;
}

interface ProductProps {
    name: string;
    priceRange: {
        min: number;
        max: number;
    };
    description: string;
    colors?: ProductColor[];
    images: ProductImage[];
    sku: string;
    category: string;
}

export default function ProductDetailCard({
    name,
    priceRange,
    description,
    colors,
    images,
    sku,
    category,
}: ProductProps) {
    const [selectedColor, setSelectedColor] = useState<string>(
        colors ? colors[0].name : ""
    );
    const [quantity, setQuantity] = useState(1);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: any, image: any) => {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setHoveredImage(image.color);
        setCursorPos({ x, y });
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };

    const mainImage =
        images.find((img) => img.color === selectedColor)?.src || images[0].src;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                    <div className="relative aspect-square">
                        <img
                            src={mainImage}
                            alt={`${name} in ${selectedColor}`}
                            className={`rounded-lg object-cover w-full h-full transition-transform duration-300 ${
                                hoveredImage === selectedColor
                                    ? "scale-150"
                                    : "scale-100"
                            }`}
                            style={{
                                transformOrigin: `${cursorPos.x}% ${cursorPos.y}%`,
                            }}
                            onMouseMove={(e) =>
                                handleMouseMove(e, { color: selectedColor })
                            }
                            onMouseLeave={handleMouseLeave}
                        />
                        <Button
                            size="icon"
                            variant="outline"
                            className="absolute top-4 right-4"
                        >
                            <Maximize2 />
                        </Button>
                    </div>
                    <div className="flex space-x-2 overflow-x-auto">
                        {images.map((image) => (
                            <button
                                key={image.color}
                                onClick={() => setSelectedColor(image.color!)}
                                className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                                    selectedColor === image.color
                                        ? "border-primary"
                                        : "border-transparent"
                                }`}
                            >
                                <div
                                    className="relative w-full h-full"
                                    onMouseMove={(e) =>
                                        handleMouseMove(e, image)
                                    }
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <img
                                        src={image.src}
                                        alt={`${name} in ${image.color}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold">{name}</h1>
                        <p className="text-3xl font-semibold mt-2">
                            ${priceRange.min.toFixed(2)} - $
                            {priceRange.max.toFixed(2)}
                        </p>
                        <span className="text-sm text-muted-foreground">
                            + Free Shipping
                        </span>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        {description.slice(0, 100)}...
                    </p>
                    <div>
                        {colors && (
                            <>
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
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-24">
                            <Label htmlFor="quantity" className="text-lg">
                                Quantity
                            </Label>
                            <div className="relative flex w-full items-center gap-12">
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
                                    className="mt-1 pr-10 pl-9 text-center text-md font-md min-w-[100px]"
                                />
                                <Minus
                                    className="absolute top-1/2 left-2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground hover:cursor-pointer"
                                    onClick={() =>
                                        setQuantity(Math.max(quantity - 1, 1))
                                    }
                                />
                                <Plus
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:cursor-pointer"
                                    onClick={() => setQuantity(quantity + 1)}
                                />
                                <Link to={"/cart"}>
                                    <Button size="lg" className="flex-1">
                                        Add to Cart
                                    </Button>
                                </Link>
                            </div>
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
