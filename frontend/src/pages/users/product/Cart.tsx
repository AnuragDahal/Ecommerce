"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/authcontext";
import { toast } from "@/hooks/use-toast";
import { useProductServices } from "@/services/useProductCreationService";
import { useMutation } from "@tanstack/react-query";
import { Minus, Plus, Trash2 } from "lucide-react";
import { title } from "process";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const Cart = () => {
    const { makePayment } = useProductServices();
    const { setClientSecret } = useAuthContext();
    const navigate = useNavigate();
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
            image: "https://images.unsplash.com/photo-1533474573390-2c9396cbec1c?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 3,
            name: "USB-C Cable",
            price: 9.99,
            quantity: 3,
            image: "https://img.freepik.com/free-photo/usb-cable-type-c-blue-background_58702-4532.jpg?t=st=1729752722~exp=1729756322~hmac=b77503b33ecde96e0eda575d75c725e92b85c0e966c911b683d6c40732808079&w=996",
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

    // Prepare payment data
    const paymentData = {
        items: [
            ...cartItems.map((item) => ({
                id: item.id.toString(),
                amount: item.price * item.quantity,
            })),
        ],
    };
    console.log(paymentData);
    const mutation = useMutation({
        mutationFn: makePayment,
        onSuccess: (data) => {
            setClientSecret(data?.data.clientSecret);
            navigate("/checkout");
        },
        onError: (data) => {
            toast({
                title: "Payment Error",
                description: data.message,
                variant: "destructive",
            });
            console.log(data.message);
        },
    });

    // Handle checkout and send cart data to backend
    const handleCheckout = async () => {
        mutation.mutate(paymentData);
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
                                        className="rounded-md w-[100px] h-[100px] object-cover"
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
                            <Button onClick={handleCheckout}>
                                Proceed To Checkout
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};
export default Cart;
