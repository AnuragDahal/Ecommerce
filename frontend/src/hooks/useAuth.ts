// import { useAuthContext } from "@/context/authcontext";
import { useLoginService, useSignUpService } from "@/services/useAuthService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    // const { login } = useAuthContext();
    const navigate = useNavigate();

    const signUpMutation = useMutation({
        mutationFn: useSignUpService,
    });
    const loginMutation = useMutation({
        mutationFn: useLoginService,
        onSuccess: (data) => {
            navigate("/");
            return data;
        },
        onError: (error) => {
            return error;
        },
    });

    return {
        signUpMutation,
        loginMutation,
    };
};

export { useAuth };
