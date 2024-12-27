import mongoose, { Types } from "mongoose";
import { Document, Schema } from "mongoose";
// To be included in future versions
// Use Cases for Aggregation Pipelines
// Total Number of Products per Seller: Calculate the total number of products each seller has.
// Average Rating of Products per Seller: Calculate the average rating of products for each seller.
// Top Sellers by Sales: Identify the top sellers based on sales data.
// Sellers by Category: Group sellers by their product categories.

interface ISellerOrder {
    productId: string;
    quantity: number;
    price: number;
    userId: string;
}
interface ISeller extends Document {
    name: string;
    userId: Schema.Types.ObjectId;
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

    contact: Array<{
        phone: string;
        email: string;
    }>;
    socialMedia: Array<{
        platform: string;
        url: string;
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
    { timestamps: true }
);

const Seller = mongoose.model<ISeller>("Seller", sellerSchema);
export default Seller;
