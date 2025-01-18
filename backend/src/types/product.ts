import mongoose, {Types} from "mongoose";
import {SellerDetails} from "./seller";

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

export interface ProductDetails {
    _id: string;
    name: string;
    price: number;
    description: string;
    totalQuantity: number;
    category: string;
    imageUrl: string[];
}

export interface ICart {
    productId: Types.ObjectId | ProductDetails;
    price: number;
    quantity: number;
    sellerId: Types.ObjectId | SellerDetails;
}
