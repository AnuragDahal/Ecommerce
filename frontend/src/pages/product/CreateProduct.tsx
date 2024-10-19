import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useProductServices } from "@/services/useProductCreationService";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

const CreateProduct = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [category, setCategory] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const { createProduct } = useProductServices();

    const ProductData = useMemo(
        () => ({
            name,
            description,
            price,
            category,
            totalQuantity,
            images,
        }),
        [name, description, price, category, totalQuantity, images]
    );

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: (data) => {
            toast({
                title: "Product created successfully!",
                description: data.message,
                variant: "success",
            });
        },
        onError: (data) => {
            console.log(ProductData);
            toast({
                title: "Product creation failed!",
                description: data.message,
                variant: "destructive",
            });
        },
    });

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            mutation.mutate(ProductData);
        },
        [mutation, ProductData]
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages(files);
        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setImagePreview(previewUrls);
    };

    return (
        <>
            <div className="max-h-screen mt-40 flex gap-10 items-center justify-center">
                <Card className="border-4 shadow-md">
                    <CardHeader>
                        <CardTitle className="font-bold text-xl text-center">
                            Create Product
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label
                                    htmlFor="name"
                                    className="font-semibold text-muted-foreground"
                                >
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter product name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="description"
                                    className="text-sm font-semibold text-muted-foreground"
                                >
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    type="text"
                                    placeholder="Enter product description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="price"
                                    className="text-sm font-semibold text-muted-foreground"
                                >
                                    Price
                                </Label>
                                <Input
                                    id="price"
                                    type="text"
                                    placeholder="Enter product price"
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(Number(e.target.value))
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="totalQuantity"
                                    className="text-sm font-semibold text-muted-foreground"
                                >
                                    Total Quantity
                                </Label>
                                <Input
                                    id="totalQuantity"
                                    type="text"
                                    placeholder="Enter total quantity"
                                    value={totalQuantity}
                                    onChange={(e) =>
                                        setTotalQuantity(Number(e.target.value))
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="category"
                                    className="text-sm font-semibold text-muted-foreground"
                                >
                                    Category
                                </Label>
                                <Input
                                    id="category"
                                    type="text"
                                    placeholder="Enter product category"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="images"
                                    className="text-sm font-semibold text-muted-foreground"
                                >
                                    Images
                                </Label>
                                <Input
                                    id="images"
                                    type="file"
                                    multiple
                                    size={3}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                />
                            </div>
                            {/* Image Preview Section */}
                            {imagePreview.length > 0 && (
                                <div className="flex gap-4">
                                    {imagePreview.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`preview-${index}`}
                                            className="h-24 w-24 object-cover rounded-lg shadow-md"
                                        />
                                    ))}
                                </div>
                            )}
                            <div className="pt-5 text-center">
                                <Button type="submit">Create Product</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CreateProduct;
