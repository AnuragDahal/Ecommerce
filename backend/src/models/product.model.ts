import mongoose from "mongoose";
import { IProduct } from "../types";

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
ProductSchema.index({name: "text", category: "text"});

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
