import mongoose, {Schema} from "mongoose";
import {ISeller} from "../types";

const sellerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        storeName: {
            type: String,
            required: true,
        },
        address: [
            {
                _id: false,
                street: {
                    type: String,
                    required: true,
                },
                city: {
                    type: String,
                    required: true,
                },
                country: {
                    type: String,
                    required: true,
                },
            },
        ],
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        businessEmail: {
            type: String,
            required: true,
            unique: true,
        },
        products: {
            type: Array,
        },
        orders: {
            type: Array,
        },
        paymentDetails: [
            {
                _id: false,
                bankAccountNumber: {
                    type: String,
                    required: true,
                },
            },
        ],
        contact: [
            {
                _id: false,
                phone: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
            },
        ],
        socialMedia: [
            {
                platform: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {timestamps: true}
);

const Seller = mongoose.model<ISeller>("Seller", sellerSchema);
export default Seller;
