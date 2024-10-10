import { useLoginService, useSignUpService } from "@/services/useAuthService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();

    const signUpMutation = useMutation({
        mutationFn: useSignUpService,
    });
    const loginMutation = useMutation({
        mutationFn: useLoginService,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
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
