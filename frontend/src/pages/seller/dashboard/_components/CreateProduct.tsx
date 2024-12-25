"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useProductServices } from "@/services/useProductServices";
import { useMutation } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function CreateProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [totalQuantity, setTotalQuantity] = useState(1);
    const [category, setCategory] = useState("");
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dragging, setDragging] = useState(false);
    const { createProduct } = useProductServices();

    const ProductData = useMemo(
        () => ({
            name,
            description,
            price: Number(price),
            category,
            totalQuantity,
            images,
        }),
        [name, description, price, category, totalQuantity, images]
    );

    const isValidPrice = (value: string) => {
        const number = Number(value);
        return !isNaN(number) && number > 0;
    };

    const isFormValid = useMemo(() => {
        return (
            name.trim() !== "" &&
            description.trim() !== "" &&
            isValidPrice(price) &&
            totalQuantity > 0 &&
            category.trim() !== "" &&
            images.length > 0
        );
    }, [name, description, price, totalQuantity, category, images]);

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: (data) => {
            setIsLoading(false);
            toast({
                title: "Product created successfully!",
                description: data.message,
                variant: "success",
            });
        },
        onError: (data) => {
            setIsLoading(false);
            toast({
                title: "Product creation failed!",
                description: data.message,
                variant: "destructive",
            });
        },
    });

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            setIsLoading(true);
            e.preventDefault();
            mutation.mutate(ProductData);
            console.log("ProductData", ProductData);
        },
        [mutation, ProductData]
    );

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setPrice(value);
        }
    };

    const handleFiles = (files: File[]) => {
        const newImages = [...images, ...files];
        setImages(newImages);
        const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
        setImagePreview((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        handleFiles(files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleDeleteImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newImagePreview = [...imagePreview];
        URL.revokeObjectURL(newImagePreview[index]);
        newImagePreview.splice(index, 1);
        setImagePreview(newImagePreview);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Card className="w-full shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Create Product
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="text-sm font-medium text-muted-foreground"
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
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="description"
                                className="text-sm font-medium text-muted-foreground"
                            >
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Enter product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="w-full no-scrollbar"
                                maxLength={500}
                                minLength={20}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="price"
                                    className="text-sm font-medium text-muted-foreground"
                                >
                                    Price
                                </Label>
                                <Input
                                    id="price"
                                    type="text"
                                    placeholder="Enter product price"
                                    value={price}
                                    onChange={handlePriceChange}
                                    required
                                    className="w-full"
                                    inputMode="decimal"
                                    pattern="^\d*\.?\d*$"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="totalQuantity"
                                    className="text-sm font-medium text-muted-foreground"
                                >
                                    Total Quantity
                                </Label>
                                <Input
                                    id="totalQuantity"
                                    type="number"
                                    placeholder="Enter total quantity"
                                    value={totalQuantity}
                                    onChange={(e) =>
                                        setTotalQuantity(Number(e.target.value))
                                    }
                                    required
                                    className="w-full"
                                    min="1"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="category"
                                className="text-sm font-medium text-muted-foreground"
                            >
                                Category
                            </Label>
                            <Select onValueChange={setCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Clothes">
                                        Clothes
                                    </SelectItem>
                                    <SelectItem value="Shoes">Shoes</SelectItem>
                                    <SelectItem value="Beauty">
                                        Beauty
                                    </SelectItem>
                                    <SelectItem value="Electronics">
                                        Electronics
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="images"
                                className="text-sm font-medium text-muted-foreground"
                            >
                                Images
                                <div
                                    className={`border-2 border-dashed border-muted-foreground rounded-lg p-4 text-center ${
                                        dragging ? "bg-muted" : ""
                                    }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <p>
                                        Drag and drop images here or click to
                                        upload
                                    </p>
                                    <Input
                                        id="images"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        required
                                        className="hidden"
                                    />
                                </div>
                            </Label>
                        </div>
                        {imagePreview.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {imagePreview.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={image}
                                            alt={`preview-${index}`}
                                            className="h-24 w-full object-cover rounded-lg shadow-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteImage(index)
                                            }
                                            className="absolute top-1 right-1 bg-muted rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label="Delete image"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                disabled={isLoading || !isFormValid}
                                className={`w-full sm:w-auto ${
                                    !isFormValid &&
                                    "opacity-50 cursor-not-allowed"
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Product"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
