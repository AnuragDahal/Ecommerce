import { z } from "zod";

export const updateUserProfileSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    address: z.string().optional(),
    phoneNumber: z.string().optional(),
    profilePic: z.string().optional(),
});

export const getUserProfileSchema = z.object({
    userId: z.string().nonempty("User ID is required"),
});

export const addToCartSchema = z.object({
    products: z.array(z.object({
        productId: z.string().nonempty("Product ID is required"),
        quantity: z.number().positive("Quantity must be a positive number"),
        price: z.number().positive("Price must be a positive number"),
        sellerId: z.string().nonempty("Seller ID is required"),
    })).nonempty("Products array cannot be empty"),
});

export const removeFromCartSchema = z.object({
    productId: z.string().nonempty("Product ID is required"),
});

export const manageCartQuantitySchema = z.object({
    productId: z.string().nonempty("Product ID is required"),
    quantity: z.number().positive("Quantity must be a positive number"),
});