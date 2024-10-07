import mongoose, { Types } from "mongoose";
import { Document, Schema } from "mongoose";
// _id ObjectId pk
//  userId ObjectId['users']
//  name string
//  storeName string
//  categoryOfProduct string
//  products Array[ObjectId['products']]//list of products

//  paymentDetails Array[]
//  contact Array[]//phone, email etc
interface ISeller extends Document {
    name: string;
    userId: Schema.Types.ObjectId;
    email: string;
    storeName: string;
    categoryOfProduct: string;
    imageUrl: string;
    products: Array<Types.ObjectId>;
    paymentDetails: Array<{
        bankAccountNumber: string;
    }>;
    contact: Array<{
        phone: string;
        email: string;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

const sellerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        storeName: {
            type: String,
            required: true,
        },
        categoryOfProduct: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        paymentDetails: [
            {
                bankAccountNumber: {
                    type: String,
                    required: true,
                },
            },
        ],
        contact: [
            {
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
    },
    { timestamps: true }
);

const Seller = mongoose.model<ISeller>("Seller", sellerSchema);
export default Seller;
