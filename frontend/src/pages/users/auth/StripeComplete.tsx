import CompletePage from "@/components/reuseable/CompletePage";
import { useAuthContext } from "@/context/authcontext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const StripeComplete = () => {
    const { clientSecret } = useAuthContext();
    const stripePromise = loadStripe(
        "pk_test_51Q59s6ELQPr0YnFbvjMChQzX7pcM6Iz51i85sF5kLqFQw2KTgkifuFnRgbQo9j000VnaDTOsH8kFkzycaFBJN2sf00xSJTfxIg"
    );
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CompletePage />
            </Elements>
        </div>
    );
};

export default StripeComplete;
