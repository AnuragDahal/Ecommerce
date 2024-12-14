"use-server";
import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
    AddressElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const addressElement = elements.getElement(AddressElement);
        const address = await addressElement?.getValue();
        if (!address?.complete) {
            setMessage("Please complete your shipping details.");
            setIsLoading(false);
            return;
        }
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/complete`,
            },
        });
        if (
            error?.type === "card_error" ||
            error?.type === "validation_error"
        ) {
            setMessage(error.message || "An unexpected error occurred.");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs" as const,
    };

    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
            <form
                id="payment-form"
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <Card className="w-full max-w-md border-2 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            Checkout
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AddressElement
                            id="address-element"
                            options={{ mode: "shipping" }}
                        />
                        <PaymentElement
                            id="payment-element"
                            options={paymentElementOptions}
                        />
                        <CardFooter className="w-full text-center">
                            <Button
                                disabled={isLoading || !stripe || !elements}
                                id="submit"
                                className="w-full"
                            >
                                <span
                                    id="button-text"
                                    className="flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        "Pay now"
                                    )}
                                </span>
                            </Button>
                        </CardFooter>
                        {/* Show any error or success messages */}
                        {message && (
                            <div
                                id="payment-message"
                                className="text-sm text-red-500 text-center mt-4"
                            >
                                {message}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
