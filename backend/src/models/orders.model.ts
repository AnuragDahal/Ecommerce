import mongoose from "mongoose";
// _id  ObjectId pk
// userId ObjectId['user]
// sellerId ObjectId['seller']
// productId Array[ObjectId['products]]
// quantity number
// toalAmoount number
// isPaid boolean
// status Enum//["pending","deliverd","cancelled"]
// shippingDetails Array[]// address of the customer
// deliveryCharges numnber

type EnumStatus = "pending" | "delivered" | "cancelled";

interface IOrder extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    sellerId: mongoose.Types.ObjectId;
    productId: Array<mongoose.Types.ObjectId>;
    quantity: number;
    totalAmount: number;
    isPaid: boolean;
    status: EnumStatus;
    shippingDetails: Array<{
        address: string;
    }>;
    deliveryCharges: number;
    createdAt: Date;
    updatedAt: Date;
}
