import { z } from "zod";

export const createSellerSchema = z.object({
    storeName: z.string().nonempty("Store name is required"),
    businessEmail: z.string().email("Please enter a valid email"),
    paymentDetails: z.array(z.object({
        bankAccountNumber: z.string().nonempty("Bank account number is required"),
    })).nonempty("Payment details cannot be empty"),
    contact: z.array(z.object({
        phone: z.string().nonempty("Phone number is required"),
        email: z.string().email("Please enter a valid email"),
    })).nonempty("Contact details cannot be empty"),
    address: z.object({
        street: z.string().nonempty("Street is required"),
        city: z.string().nonempty("City is required"),
        country: z.string().nonempty("Country is required"),
    }),
});

export const getSellerSchema = z.object({
    sellerId: z.string().nonempty("Seller ID is required"),
});