"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { format, parseISO } from "date-fns"; // Use parseISO for correct date handling
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "@/services/userOrderServices";

interface OrderItem {
    product: {
        _id: string;
        name: string;
        price: number;
    };
    seller: {
        _id: string;
        storeName: string;
        contact: { phone: string }[];
    };
    quantity: number;
}

interface Order {
    id: string;
    date: string;
    status: string; // Adjusted to match API lowercase
    total: number;
    items: OrderItem[];
}

export default function MyOrdersPage() {
    const { data } = useQuery({
        queryKey: ["userOrders"],
        queryFn: getUserOrders,
    });
    const orderDetails: Order[] = data?.data?.orders || [];

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "processing":
                return "bg-yellow-500";
            case "shipped":
                return "bg-blue-500";
            case "delivered":
                return "bg-green-500";
            case "cancelled":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    const capitalizeFirstLetter = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orderDetails.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>
                                        {format(
                                            parseISO(order.date),
                                            "MMM dd, yyyy"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`${getStatusColor(
                                                order.status
                                            )} text-white`}
                                        >
                                            {capitalizeFirstLetter(
                                                order.status
                                            )}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        ${order.total.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    View Details
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Order Details -{" "}
                                                        {order.id}
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <div className="mt-4">
                                                    <p>
                                                        <strong>Date:</strong>{" "}
                                                        {format(
                                                            parseISO(
                                                                order.date
                                                            ),
                                                            "MMMM dd, yyyy"
                                                        )}
                                                    </p>
                                                    <p>
                                                        <strong>Status:</strong>{" "}
                                                        {capitalizeFirstLetter(
                                                            order.status
                                                        )}
                                                    </p>
                                                    <p>
                                                        <strong>Total:</strong>{" "}
                                                        $
                                                        {order.total.toFixed(2)}
                                                    </p>
                                                    <h4 className="font-semibold mt-4 mb-2">
                                                        Items:
                                                    </h4>
                                                    <ul className="list-disc pl-5">
                                                        {order.items.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item
                                                                            .product
                                                                            ._id
                                                                    }
                                                                >
                                                                    {
                                                                        item
                                                                            .product
                                                                            .name
                                                                    }
                                                                    - Qty:
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                    - $
                                                                    {item.product.price.toFixed(
                                                                        2
                                                                    )}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
