import User from "../models/user.model";
import { Types } from "mongoose";
export const generateAccessAndRefreshToken = async (userId: Types.ObjectId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return { error: "User not found" };
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        // Save the user with the new refresh token and don't validate
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        return { error: "Failed to generate access and refresh token" };
    }
};
