import mongoose, { Types } from "mongoose";
import { Document, Schema } from "mongoose";
// To be included in future versions
// Use Cases for Aggregation Pipelines
// Total Number of Products per Seller: Calculate the total number of products each seller has.
// Average Rating of Products per Seller: Calculate the average rating of products for each seller.
// Top Sellers by Sales: Identify the top sellers based on sales data.
// Sellers by Category: Group sellers by their product categories.
interface ISeller extends Document {
    name: string;
    userId: Schema.Types.ObjectId;
    email: string;
    storeName: string;
    categoryOfProduct: string;
    imageUrl: string;
    products: Array<Types.ObjectId>;
    address: string;
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
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
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
                required: false,
            },
        ],
        address: {
            type: String,
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

const Seller = mongoose.model<ISeller>("Seller", sellerSchema);
export default Seller;