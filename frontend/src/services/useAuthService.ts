import axios from "axios";
import Cookies from "js-cookie";

interface ISignUpData {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}
interface IOtpVerificationData {
    email: string;
    otp: string;
    verificationToken?: string;
}

interface IResetPassword {
    email: string;
    otp: string;
    newPassword: string;
}
interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}

export const useSignUpService = async (data: ISignUpData) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_AUTH
            }/signup`,
            data
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw new Error("Network Error");
        }
    }
};

export const useLoginService = async (data: Partial<ISignUpData>) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_AUTH
            }/login`,
            data
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw new Error("Network Error");
        }
    }
};

export const useOtpVerificationService = async (data: IOtpVerificationData) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_AUTH
            }/verify`,
            data
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw new Error("Network Error");
        }
    }
};

export const useForgotPasswordService = async (
    data: Partial<IOtpVerificationData>
) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_AUTH
            }/forgot-password`,
            data
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw new Error("Network Error");
        }
    }
};

export const useResetPasswordService = async (data: IResetPassword) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_AUTH
            }/reset-password`,
            data
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw new Error("Network Error");
        }
    }
};

export const userChangePasswordService = async (data: IChangePassword) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_AUTH
            }/change-password`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw new Error("Network Error");
        }
    }
};

export const useRefreshTokenService = async () => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_AUTH
            }/refresh-token`,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw new Error("Network Error");
        }
    }
};

export const useGetRoleService = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_AUTH
            }/get-role`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw new Error("Network Error");
        }
    }
};
