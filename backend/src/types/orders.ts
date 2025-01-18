import mongoose from "mongoose";
import {ICart} from "./product";
import {OrderStatus} from "../enums";

export interface IOrder extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    items: Array<ICart>;
    totalAmount: number;
    isPaid: boolean;
    status: OrderStatus;
    shippingDetails: IShippingDetails;
    deliveryCharges: number;
    createdAt: Date;
    updatedAt: Date;
}



export interface IShippingDetails {
    name: string;
    address: IAddress;
}

interface IAddress {
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}
