"use client";

import { useState } from "react";
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
import { format } from "date-fns";

interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    date: Date;
    status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
    total: number;
    items: OrderItem[];
}

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([
        {
            id: "ORD-001",
            date: new Date("2023-05-15"),
            status: "Delivered",
            total: 129.97,
            items: [
                { id: 1, name: "Wireless Earbuds", quantity: 1, price: 79.99 },
                { id: 2, name: "Phone Case", quantity: 1, price: 19.99 },
                { id: 3, name: "USB-C Cable", quantity: 3, price: 9.99 },
            ],
        },
        {
            id: "ORD-002",
            date: new Date("2023-06-02"),
            status: "Shipped",
            total: 89.99,
            items: [
                { id: 4, name: "Bluetooth Speaker", quantity: 1, price: 89.99 },
            ],
        },
        {
            id: "ORD-003",
            date: new Date("2023-06-10"),
            status: "Processing",
            total: 249.99,
            items: [{ id: 5, name: "Smartwatch", quantity: 1, price: 249.99 }],
        },
    ]);

    const getStatusColor = (status: Order["status"]) => {
        switch (status) {
            case "Processing":
                return "bg-yellow-500";
            case "Shipped":
                return "bg-blue-500";
            case "Delivered":
                return "bg-green-500";
            case "Cancelled":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

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
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>
                                        {format(order.date, "MMM dd, yyyy")}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`${getStatusColor(
                                                order.status
                                            )} text-white`}
                                        >
                                            {order.status}
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
                                                            order.date,
                                                            "MMMM dd, yyyy"
                                                        )}
                                                    </p>
                                                    <p>
                                                        <strong>Status:</strong>{" "}
                                                        {order.status}
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
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.name}{" "}
                                                                    - Qty:{" "}
                                                                    {
                                                                        item.quantity
                                                                    }{" "}
                                                                    - $
                                                                    {item.price.toFixed(
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
