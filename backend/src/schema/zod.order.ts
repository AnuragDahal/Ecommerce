import { z } from "zod";

export const createOrderSchema = z.object({
    orderDetails: z.object({
        items: z
            .array(
                z.object({
                    productId: z.string().nonempty("Product ID is required"),
                    quantity: z
                        .number()
                        .positive("Quantity must be a positive number"),
                    price: z
                        .number()
                        .positive("Price must be a positive number"),
                    sellerId: z.string().nonempty("Seller ID is required"),
                })
            )
            .nonempty("Items array cannot be empty"),
    }),
    shippingAddress: z.object({
        city: z.string().nonempty("City is required"),
        stae: z.string().optional(),
        postal_code: z.string().nonempty("Zip Code is required"),
        country: z.string().nonempty("Country is required"),
        line1: z.string().nonempty("Address Line 1 is required"),
        line2: z.string().optional(),
    }),
});

export const getOrderSchema = z.object({
    orderId: z.string().nonempty("Order ID is required"),
});
