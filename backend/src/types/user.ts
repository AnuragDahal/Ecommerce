// firstName string
// lastName string
// userName string unique
// address string
// email string unique
// isEmailVerified boolean//default false
// role Enum["user","seller","admin"]//default user
// password string
// avatar string //cloudinary url
// refreshToken string
// createdAt Date
// updateAt Date

import { Document, Types } from "mongoose";

type EnumRole = "user" | "seller" | "admin";

export interface ProductDetails {
    name: string;
    price: number;
    description: string;
    totalQuantity: number;
    category: string;
    imageUrl: string[];
}

export interface SellerDetails {
    _id: Types.ObjectId;
    storeName: string;
    businessEmail: string;
}

export interface IUser extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    address?: string;
    isEmailVerified?: boolean;
    cart: Array<{
        productId: Types.ObjectId | ProductDetails;
        price: number;
        quantity: number;
        sellerId: Types.ObjectId | SellerDetails;
    }>;
    role: EnumRole;
    password: string;
    avatar: string;
    otp?: string;
    otpExpires?: Date;
    refreshToken: string;
    isPasswordCorrect(candidatePassword: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

export interface IJWTPayload {
    _id: Types.ObjectId;
    email: string;
    userName: string;
}

export interface IJWTPayload2 {
    _id: string;
    email: string;
    userName: string;
}
