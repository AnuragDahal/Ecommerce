"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "Wireless Earbuds",
            price: 79.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1509118023854-a4312f316fe0?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 2,
            name: "Smartphone Case",
            price: 19.99,
            quantity: 2,
            image: "/placeholder.svg?height=100&width=100",
        },
        {
            id: 3,
            name: "USB-C Cable",
            price: 9.99,
            quantity: 3,
            image: "/placeholder.svg?height=100&width=100",
        },
    ]);

    // Update quantity locally
    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity > 0) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        } else {
            removeItem(id); // Remove if quantity is zero or less
        }
    };

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    // Calculate totals
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const tax = subtotal * 0.1; // Assuming 10% tax
    const total = subtotal + tax;

    // Handle checkout and send cart data to backend
    const handleCheckout = async () => {
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartItems, subtotal, total }),
            });

            if (response.ok) {
                // Handle successful checkout
                console.log("Checkout successful!");
            } else {
                // Handle checkout error
                console.error("Checkout failed.");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {cartItems.map((item) => (
                        <Card key={item.id} className="mb-4">
                            <CardContent className="p-4">
                                <div className="flex items-center">
                                    <img
                                        loading="lazy"
                                        src={item.image}
                                        alt={item.name}
                                        className="rounded-md w-[100px] h-[100px]"
                                    />
                                    <div className="ml-4 flex-grow space-y-2">
                                        <h3 className="font-semibold">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <Input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateQuantity(
                                                    item.id,
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className="w-16 mx-2 text-center"
                                            min={1}
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="ml-4"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                onClick={handleCheckout}
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};
export default Cart;
