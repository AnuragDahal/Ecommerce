import axios from "axios";
import Cookies from "js-cookie";

interface ISellerData {
    storeName: string;
    businessEmail: string;
    paymentDetails?: Array<{
        bankAccountNumber: string;
    }>;
    address: {
        street: string;
        city: string;
        country: string;
    };
    contact: Array<{
        phone: string;
        email: string;
    }>;
}

export const useSellerAccountCreationService = async (data: ISellerData) => {
    try {
        const accessToken = Cookies.get("accessToken");
        // const fd = new FormData();
        // fd.append("storeName", data.storeName);
        // fd.append("businessEmail", data.businessEmail);
        // fd.append("address", JSON.stringify(data.address));
        // fd.append("contact", JSON.stringify(data.contact));
        // fd.append("paymentDetails", JSON.stringify(data.paymentDetails));
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_SELLER
            }/create`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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

export const getSellerOrders = async () => {
    try {
        const accessToken = Cookies.get("accessToken");
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_SELLER
            }/orders`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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
