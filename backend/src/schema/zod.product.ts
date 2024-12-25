import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().nonempty("Product name is required"),
    price: z.number().positive("Price must be a positive number"),
    description: z.string().nonempty("Description is required"),
    totalQuantity: z.number().positive("Total quantity must be a positive number"),
    category: z.string().nonempty("Category is required"),
});

export const updateProductSchema = z.object({
    name: z.string().optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    description: z.string().optional(),
    totalQuantity: z.number().positive("Total quantity must be a positive number").optional(),
    category: z.string().optional(),
    discount: z.number().min(0).max(100).optional(),
    imageUrl: z.array(z.string()).optional(),
});

export const getProductSchema = z.object({
    productId: z.string().nonempty("Product ID is required"),
});