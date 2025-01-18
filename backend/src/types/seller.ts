import {Types} from "mongoose";
import {Schema} from "zod";

export interface SellerDetails {
    _id: string;
    storeName: string;
    businessEmail: string;
}

interface ISellerOrder {
    productId: string;
    quantity: number;
    price: number;
    userId: string;
}

export interface ISeller extends Document {
    name: string;
    userId: Types.ObjectId;
    email: string;
    storeName: string;
    categoryOfProduct: string;
    imageUrl: string;
    products: Array<Types.ObjectId>;
    orders: Array<ISellerOrder>;
    storeAddress: string;
    paymentDetails: Array<{
        bankAccountNumber: string;
    }>;
    contact: Array<ISellerContactDetails>;
    socialMedia: Array<ISocialMedia>;
    createdAt: Date;
    updatedAt: Date;
}
interface ISellerContactDetails {
    phone: string;
    email: string;
}
interface ISocialMedia {
    platform: string;
    url: string;
}
