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

import { Types } from "mongoose";

type EnumRole = "user" | "seller" | "admin";
export interface IUser extends Document {
    firstName: String;
    lastName: String;
    email: String;
    userName: String;
    address?: String;
    isEmailVerified?: Boolean;
    role: EnumRole;
    password: String;
    avatar: String;
    otp?: String;
    otpExpires?: Date;
    refreshToken: String;
    isPasswordCorrect(candidatePassword: String): Promise<Boolean>;
    generateAccessToken(): String;
    generateRefreshToken(): String;
}

export interface IJWTPayload {
    _id: Types.ObjectId;
    email: String;
    userName: String;
}
