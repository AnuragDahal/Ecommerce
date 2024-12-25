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
import { useProductServices } from "@/services/useProductServices";
import {
    clearCart,
    getUserCartItems,
    manageCartQuantity,
    removeFromCart,
    // clearCartItems, ]
} from "@/services/useUserServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
    id: string;
    title: string;
    price: number;
    category: string;
    quantity: number;
    images: Array<string>;
    seller: {
        id: string;
        storeName: string;
    };
}

// Debounce utility function
function debounce(func: (...args: any[]) => void, delay: number) {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const Cart = () => {
    const { makePayment } = useProductServices();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    const { data } = useQuery({
        queryKey: ["cart"],
        queryFn: getUserCartItems,
    });

    const calculateTotal = useCallback(() => {
        return cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
    }, [cartItems]);

    useEffect(() => {
        if (data) {
            setCartItems(data.data.cart);
            setIsLoading(false);
        }
    }, [data]);

    useEffect(() => {
        setTotal(calculateTotal());
    }, [cartItems, calculateTotal]);

    const paymentData = {
        items: cartItems.map((item) => ({
            id: item.id,
            amount: item.price * item.quantity,
        })),
    };

    const quantityUpdate = useMutation({
        mutationKey: ["updateQuantity"],
        mutationFn: manageCartQuantity,
        onMutate: (data) => {
            const { productId, quantity } = data;
            const index = cartItems.findIndex((item) => item.id === productId);
            const newCartItems = [...cartItems];
            newCartItems[index].quantity = quantity;
            setCartItems(newCartItems);
        },
    });

    const debouncedQuantityUpdate = useMemo(
        () =>
            debounce((productId: string, quantity: number) => {
                quantityUpdate.mutate({ productId, quantity });
            }, 300),
        [quantityUpdate]
    );

    const removeItem = useMutation({
        mutationKey: ["removeItem"],
        mutationFn: removeFromCart,
        onMutate: (data) => {
            const newCartItems = cartItems.filter((item) => item.id !== data);
            setCartItems(newCartItems);
        },
    });

    const clearAllCart = useMutation({
        mutationKey: ["clearCart"],
        mutationFn: clearCart,
        onSuccess: () => {
            setCartItems([]);
            setTotal(0);
            toast({
                title: "Cart Cleared",
                description: "All items have been removed from your cart.",
                variant: "success",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to clear the cart. Please try again.",
                variant: "destructive",
            });
        },
    });

    const mutation = useMutation({
        mutationFn: makePayment,
        onSuccess: (data) => {
            localStorage.setItem("clientSecret", data?.data.clientSecret);
            setCartItems([]);
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
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Cart Items</h2>
                        {cartItems.length > 0 && (
                            <Button
                                variant="outline"
                                onClick={() => clearAllCart.mutate()}
                                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                            >
                                Clear Cart
                            </Button>
                        )}
                    </div>
                    {cartItems.length === 0 ? (
                        <Card className="p-8 text-center">
                            <p className="text-gray-500">Your cart is empty</p>
                        </Card>
                    ) : (
                        cartItems.map((item) => (
                            <Card key={item.id} className="mb-4">
                                <CardContent className="p-4">
                                    <div className="flex items-center">
                                        <img
                                            loading="lazy"
                                            src={item.images[0]}
                                            alt={item.title}
                                            className="rounded-md w-[100px] h-[100px] object-cover"
                                        />
                                        <div className="ml-4 flex-grow space-y-2">
                                            <h3 className="font-semibold">
                                                {item.title}
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
                                                    debouncedQuantityUpdate(
                                                        item.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                                disabled={item.quantity === 1}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <Input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    debouncedQuantityUpdate(
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
                                                    debouncedQuantityUpdate(
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
                                            onClick={() =>
                                                removeItem.mutate(item.id)
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
