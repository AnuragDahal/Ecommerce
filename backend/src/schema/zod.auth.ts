import { z } from "zod";

export const signUpSchema = z.object({
    firstName: z
        .string()
        .min(3, "First name must be at least 3 characters long"),
    lastName: z.string().min(3, "Last name must be at least 3 characters long"),
    email: z.string().email("Please enter a valid email"),
    userName: z
        .string()
        .nonempty("Username cannot be empty")
        .min(6, "Username must be at least 6 characters long"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .refine((value) => {
            return /[A-Z]/.test(value); // Check for uppercase letter
        }, "Password must contain at least one uppercase letter")
        .refine((value) => {
            return /[a-z]/.test(value); // Check for lowercase letter
        }, "Password must contain at least one lowercase letter")
        .refine((value) => {
            return /[0-9]/.test(value); // Check for number
        }, "Password must contain at least one number")
        .refine((value) => {
            return /[!@#$%^&*(),.?":{}|<>]/.test(value); // Check for special character
        }, "Password must contain at least one special character"),
});

export const loginSchema = z
    .object({
        userName: z.string().optional(),
        email: z.string().email("Please enter a valid email").optional(),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
    })
    .refine((data) => data.userName || data.email, {
        message: "Either username or email must be provided",
        path: ["userName", "email"],
    });

export const refreshTokenSchema = z.object({
    refreshToken: z.string().nonempty("Refresh token is required"),
});

export const otpVerificationSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    otp: z.string().length(6, "OTP must be 6 digits long"),
});
export const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email"),
});
export const resetPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    otp: z.string().length(6, "OTP must be 6 digits long"),
    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .refine(
            (value) => /[A-Z]/.test(value),
            "Password must contain at least one uppercase letter"
        )
        .refine(
            (value) => /[a-z]/.test(value),
            "Password must contain at least one lowercase letter"
        )
        .refine(
            (value) => /[0-9]/.test(value),
            "Password must contain at least one number"
        )
        .refine(
            (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
            "Password must contain at least one special character"
        ),
});

export const changePasswordSchema = z.object({
    oldPassword: z
        .string()
        .min(8, "Old password must be at least 8 characters long"),
    newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters long")
        .refine(
            (value) => /[A-Z]/.test(value),
            "New password must contain at least one uppercase letter"
        )
        .refine(
            (value) => /[a-z]/.test(value),
            "New password must contain at least one lowercase letter"
        )
        .refine(
            (value) => /[0-9]/.test(value),
            "New password must contain at least one number"
        )
        .refine(
            (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
            "New password must contain at least one special character"
        ),
});

export const paymentIntentSchema = z.object({
    items: z
        .array(
            z.object({
                amount: z.number().positive("Amount must be a positive number"),
            })
        )
        .nonempty("Items array cannot be empty"),
});
export const paymentRetrieveSchema = z.object({
    paymentIntentId: z.string().nonempty("Payment Intent ID is required"),
});
