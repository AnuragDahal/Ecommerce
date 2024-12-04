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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, HelpCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const STATUS_CONTENT_MAP: {
    [key: string]: { iconColor: string; icon: JSX.Element; text: string };
} = {
    succeeded: {
        iconColor: "text-green-500",
        icon: <CheckCircle2 className="w-12 h-12" />,
        text: "Payment succeeded",
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

export default function CompletePage() {
    const stripe = useStripe();
    const [status, setStatus] = useState<string | null>(null);
    const [intentId, setIntentId] = useState<string | null>(null);

    useLayoutEffect(() => {
        if (!stripe) return;

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) return;

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (!paymentIntent) return;

            setStatus(paymentIntent.status);
            setIntentId(paymentIntent.id);
        });
    }, [stripe]);

    // Set a fallback for when `status` is not defined or doesn't match a key in `STATUS_CONTENT_MAP`
    const content = STATUS_CONTENT_MAP[status!] || {
        iconColor: "text-gray-500",
        icon: <HelpCircle className="w-12 h-12" />,
        text: "",
    };

    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Payment Status
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                        <div className={`${content.iconColor}`}>
                            {content.icon}
                        </div>
                        <h2 className="text-xl font-semibold">
                            {content.text}
                        </h2>
                    </div>
                    {intentId && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        Field
                                    </TableHead>
                                    <TableHead>Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        ID
                                    </TableCell>
                                    <TableCell className="font-mono text-sm break-all">
                                        {intentId}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        Status
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {status}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    {intentId && (
                        <Button asChild variant="outline" className="w-full">
                            <Link
                                to={`https://dashboard.stripe.com/payments/${intentId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View details in Stripe Dashboard
                            </Link>
                        </Button>
                    )}
                    <Button asChild className="w-full">
                        <Link to="/checkout">Test another payment</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
