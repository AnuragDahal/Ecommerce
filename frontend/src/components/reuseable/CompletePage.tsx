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
import { useMutation } from "@tanstack/react-query";
import { placeUserOrder } from "@/services/userOrderServices";
import { useToast } from "@/hooks/use-toast";

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
    // Add other statuses as needed
};
interface ICart {
    items: {
        productId: string;
        sellerId: string;
        price: number;
        quantity: number;
    }[];
    shippingAddress?: string;
    paymentMethod?: string;
}

export default function CompletePage({ cartItems }: { cartItems: ICart }) {
    // get the cart items from the local    storage

    const { toast } = useToast();
    const stripe = useStripe();
    const [status, setStatus] = useState<string | null>(null);

    const mutation = useMutation({
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
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
                duration: 5000,
            });
        },
    });

    useLayoutEffect(() => {
        if (!stripe) return;

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) return;

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (!paymentIntent) return;

            if (paymentIntent.status === "succeeded") {
                mutation.mutate({
                    items: [],
                    shippingAddress: "",
                    paymentMethod: "",
                });
            }

            setStatus(paymentIntent.status);
        });
    }, [stripe]);

    // Set a fallback for when `status` is not defined or doesn't match a key in `STATUS_CONTENT_MAP`

    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center">
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
