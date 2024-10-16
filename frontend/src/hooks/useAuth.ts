// import { useAuthContext } from "@/context/authcontext";
import {
    useOtpVerificationService,
    useLoginService,
    useSignUpService,
} from "@/services/useAuthService";
import { useMutation } from "@tanstack/react-query";

const useAuth = () => {
    // const { login } = useAuthContext();
    const signUpMutation = useMutation({
        mutationFn: useSignUpService,
    });
    const loginMutation = useMutation({
        mutationFn: useLoginService,
    });
    const emailVerification = useMutation({
        mutationFn: useOtpVerificationService,
    });

    return {
        signUpMutation,
        loginMutation,
        emailVerification,
    };
};

export { useAuth };
