import {Document, Types} from "mongoose";
import {Role} from "../enums";
import {ICart} from ".";

export interface IUser extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    address?: string;
    phoneNumber: string;
    isEmailVerified?: boolean;
    cart: Array<ICart>;
    orders: Array<Types.ObjectId>;
    role: Role;
    password: string;
    avatar: string;
    profilePic: string;
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
