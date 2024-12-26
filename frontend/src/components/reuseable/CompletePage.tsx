"use client";

import { useStripe } from "@stripe/react-stripe-js";
import { useLayoutEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { placeUserOrder } from "@/services/userOrderServices";
import { useToast } from "@/hooks/use-toast";
import { getUserCartItems } from "@/services/useUserServices";
import { usePaymentIntentService } from "@/services/useAuthService";
import { IOrder, IShippingAddress, PaymentIntentResponse } from "@/types";

const STATUS_CONTENT_MAP: {
    [key: string]: { iconColor: string; icon: JSX.Element; text: string };
} = {
    succeeded: {
        iconColor: "text-green-500",
        icon: <CheckCircle2 className="w-12 h-12" />,
        text: "Payment successful Order placed",
    },
    processing: {
        iconColor: "text-yellow-500",
        icon: <Clock className="w-12 h-12" />,
        text: "Payment processing",
    },
    requires_payment_method: {
        iconColor: "text-red-500",
        icon: <XCircle className="w-12 h-12" />,
        text: "Payment failed",
    },
};

export default function CompletePage() {
    const { toast } = useToast();
    const stripe = useStripe();
    const [status, setStatus] = useState<string | null>(null);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false); // New flag to track order placement
    const [shippingAddress, setShippingAddress] = useState<IShippingAddress>({
        city: "",
        country: "",
        line1: "",
        line2: "",
        postal_code: "",
    });

    const { data: cartData } = useQuery({
        queryKey: ["cart"],
        queryFn: getUserCartItems,
    });

    const orderMutation = useMutation({
        mutationFn: placeUserOrder,
        mutationKey: ["placeUserOrder"],
        onSuccess: () => {
            toast({
                title: "Order Placed",
                description: "Your order has been placed successfully",
                variant: "success",
                duration: 5000,
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to place your order",
                variant: "destructive",
                duration: 5000,
            });
        },
    });

    const paymentIntentMutation = useMutation<
        PaymentIntentResponse,
        Error,
        string
    >({
        mutationKey: ["paymentIntent"],
        mutationFn: usePaymentIntentService,
        onSuccess: (response) => {
            if (response.data.shipping) {
                setShippingAddress(response.data.shipping.address);
            }
        },
        onError: (error) => {
            toast({
                title: "Error retrieving payment details",
                description: error.message,
                variant: "destructive",
                duration: 5000,
            });
        },
    });

    useLayoutEffect(() => {
        if (!stripe || isOrderPlaced) return;

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) return;

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (!paymentIntent) return;

            setStatus(paymentIntent.status);

            if (paymentIntent.status === "succeeded") {
                paymentIntentMutation.mutate(paymentIntent.id);
            }
        });
    }, [stripe, isOrderPlaced]);

    useLayoutEffect(() => {
        if (
            status === "succeeded" &&
            !isOrderPlaced &&
            shippingAddress.city &&
            cartData?.data?.cart?.length
        ) {
            const newOrder: IOrder = {
                items: cartData.data.cart.map((item: any) => ({
                    productId: item.id as string,
                    sellerId: item.seller.id as string,
                    price: item.price as number,
                    quantity: item.quantity as number,
                })),
                shippingAddress,
                paymentMethod: "stripe",
            };
            setIsOrderPlaced(true);
            orderMutation.mutate(newOrder);
        }
    }, [status, shippingAddress, cartData, isOrderPlaced]);

    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center text-green-600">
                        {status && STATUS_CONTENT_MAP[status]?.icon}
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-lg font-semibold">
                            {status && STATUS_CONTENT_MAP[status]?.text}
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center justify-center">
                        <Link to="/orders">
                            <Button variant="link">View Orders</Button>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
