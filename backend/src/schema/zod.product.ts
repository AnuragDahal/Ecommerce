import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().nonempty("Product name is required"),
    price: z.string().nonempty("Price is required"),
    description: z.string().nonempty("Description is required"),
    totalQuantity: z.string().nonempty("Total quantity is required"),
    category: z.string().nonempty("Category is required"),
});

export const updateProductSchema = z.object({
    name: z.string().optional(),
    price: z.string().optional(),
    description: z.string().optional(),
    totalQuantity: z.string().nonempty("Total quantity is required"),
    category: z.string().optional(),
    discount: z.string().min(0).max(100).optional(),
    imageUrl: z.array(z.string()).optional(),
});

export const productParams = z.object({
    productId: z.string().nonempty("Product ID is required"),
});
