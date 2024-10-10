// import { useAuthContext } from "@/context/authcontext";
import { useLoginService, useSignUpService } from "@/services/useAuthService";
import { useMutation } from "@tanstack/react-query";

const useAuth = () => {
    // const { login } = useAuthContext();
    const signUpMutation = useMutation({
        mutationFn: useSignUpService,
    });
    const loginMutation = useMutation({
        mutationFn: useLoginService,
    });

    return {
        signUpMutation,
        loginMutation,
    };
};

export { useAuth };
