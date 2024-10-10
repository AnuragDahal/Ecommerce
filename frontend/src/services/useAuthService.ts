import axios from "axios";

interface ISignUpData {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
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
            data,
            { withCredentials: true }
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
