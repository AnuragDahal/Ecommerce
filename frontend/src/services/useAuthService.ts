import axios from "axios";

interface ISignUpData {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}
interface IEmailVerificationData {
    email: string;
    otp: number;
    verificationToken?: string;
}

interface IResetPassword {
    email: string;
    otp: number;
    newPassword: string;
}
interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}

export const useSignUpService = async (data: ISignUpData) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/auth/signup",
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
            "http://localhost:3000/api/auth/login",
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

export const useEmailVerificationService = async (
    data: IEmailVerificationData
) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/auth/verify",
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
    data: Partial<IEmailVerificationData>
) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/auth/forgot-password",
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
            "http://localhost:3000/api/auth/reset-password",
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
            "http://localhost:3000/api/auth/change-password",
            data,
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

export const useLogoutService = async () => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/auth/logout",
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
