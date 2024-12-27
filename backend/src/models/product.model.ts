import mongoose, { Types } from "mongoose";
import { SellerDetails } from "../types/user";
import { productParams } from "../schema";
export interface IProduct extends mongoose.Document {
    name: string;
    description: string;
    price: number;
    imageUrl: Array<string>;
    category: string;
    totalQuantity: number;
    countInStock: number;
    totalItemsSold: number;
    isOutOfStock: boolean;
    createdAt: Date;
    updatedAt: Date;
    discount: number;
    reviews: Array<string>;
    sellerId: Types.ObjectId | SellerDetails;
}

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        imageUrl: {
            type: Array,
            required: true,
            default: [],
        },
        category: {
            type: String,
            required: true,
        },
        totalQuantity: {
            type: Number,
            required: true,
        },
        countInStock: {
            type: Number,
            default: function (this: any) {
                return this.totalQuantity - this.totalItemsSold;
            },
        },
        totalItemsSold: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        isOutOfStock: {
            type: Boolean,
            default: function (this: any) {
                if (this.countInStock === 0) {
                    return true;
                }
                return false;
            },
        },
        reviews: {
            type: Array,
            default: [],
        },
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
ProductSchema.index({ name: "text", category: "text" });

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
