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
import { toast } from "@/hooks/use-toast";
import { useProductServices } from "@/services/useProductCreationService";
import { useMutation } from "@tanstack/react-query";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const Cart = () => {
    const { makePayment } = useProductServices();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Enhanced localStorage management
    const saveCartItems = (items: CartItem[]) => {
        try {
            localStorage.setItem("cartItems", JSON.stringify(items));
        } catch (error) {
            console.error("Error saving cart items:", error);
            toast({
                title: "Error",
                description: "Failed to save cart items",
                variant: "destructive",
            });
        }
    };

    // Load cart items from localStorage on component mount
    useEffect(() => {
        const loadCartItems = () => {
            try {
                const storedItems = localStorage.getItem("cartItems");
                console.log("Stored items from localStorage:", storedItems);

                if (storedItems) {
                    const parsedItems = JSON.parse(storedItems);
                    // Validate parsed items
                    if (Array.isArray(parsedItems)) {
                        setCartItems(parsedItems);
                        console.log(
                            "Successfully loaded cart items:",
                            parsedItems
                        );
                    } else {
                        console.error("Stored items are not in array format");
                        toast({
                            title: "Error",
                            description: "Invalid cart data format",
                            variant: "destructive",
                        });
                    }
                } else {
                    console.log("No cart items found in localStorage");
                }
            } catch (error) {
                console.error("Error loading cart items:", error);
                toast({
                    title: "Error",
                    description: "Failed to load cart items",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadCartItems();
    }, []);

    // Update quantity and persist changes
    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity > 0) {
            const updatedItems = cartItems.map((item) =>
                item.productId === id
                    ? { ...item, quantity: newQuantity }
                    : item
            );
            setCartItems(updatedItems);
            saveCartItems(updatedItems);
        } else {
            removeItem(id);
        }
    };

    const removeItem = (id: string) => {
        const updatedItems = cartItems.filter((item) => item.productId !== id);
        setCartItems(updatedItems);
        saveCartItems(updatedItems);
    };

    // Calculate totals
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    // Prepare payment data
    const paymentData = {
        items: cartItems.map((item) => ({
            id: item.productId,
            amount: item.price * item.quantity,
        })),
    };

    const mutation = useMutation({
        mutationFn: makePayment,
        onSuccess: (data) => {
            localStorage.setItem("clientSecret", data?.data.clientSecret);
            // Clear cart after successful payment
            setCartItems([]);
            saveCartItems([]); // Also clear localStorage
            navigate("/checkout");
        },
        onError: (data) => {
            toast({
                title: "Payment Error",
                description: data.message,
                variant: "destructive",
            });
        },
    });

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast({
                title: "Cart is empty",
                description:
                    "Please add items to your cart before checking out",
                variant: "destructive",
            });
            return;
        }
        mutation.mutate(paymentData);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="p-8 text-center">
                    <p className="text-gray-500">Loading cart...</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {cartItems.length === 0 ? (
                        <Card className="p-8 text-center">
                            <p className="text-gray-500">Your cart is empty</p>
                        </Card>
                    ) : (
                        cartItems.map((item) => (
                            <Card key={item.productId} className="mb-4">
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
                                                        item.productId,
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
                                                        item.productId,
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
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
                                                        item.productId,
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
                                            onClick={() =>
                                                removeItem(item.productId)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
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
                                onClick={handleCheckout}
                                disabled={cartItems.length === 0}
                                className="w-full"
                            >
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
