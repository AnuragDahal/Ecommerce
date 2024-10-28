import mongoose, { Schema } from "mongoose";

type EnumStatus = {
    pending: string;
    delivered: string;
    cancelled: string;
    processing: string;
    shipped: string;
};

interface IOrder extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    items: Array<{
        sellerId: mongoose.Types.ObjectId;
        productId: mongoose.Types.ObjectId;
        quantity: number;
        price: number; // Price for the single product
    }>;
    totalAmount: number;
    isPaid: boolean;
    status: EnumStatus;
    shippingDetails: {
        name: string;
        address: {
            line1: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
        };
    };
    deliveryCharges: number;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
        items: {
            sellerId: {
                type: Schema.Types.ObjectId,
                ref: "Seller",
            },
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            type: Array,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["pending", "delivered", "cancelled"],
            default: "pending",
        },
        shippingDetails: {
            name: {
                type: String,
                required: true,
            },
            address: {
                line1: {
                    type: String,
                    required: true,
                },
                city: {
                    type: String,
                    required: true,
                },
                state: {
                    type: String,
                    required: true,
                },
                postal_code: {
                    type: String,
                    required: true,
                },
                country: {
                    type: String,
                    required: true,
                },
            },
        },
        deliveryCharges: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
orderSchema.methods.getSalesBySeller = function () {
    return this.aggregate([
        {
            $unwind: "$items",
        },
        {
            $group: {
                _id: "$items.sellerId",
                totalSales: { $sum: "$items.price" },
                orderCount: { $sum: 1 },
            },
        },
    ]);
};

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
