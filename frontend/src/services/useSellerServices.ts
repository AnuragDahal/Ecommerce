import axios from "axios";
import Cookies from "js-cookie";

interface ISellerData {
    storeName: string;
    businessEmail: string;
    paymentDetails?: Array<{
        bankAccountNumber: string;
    }>;
    address: string;
    contact: Array<{
        phone: string;
        email: string;
    }>;
}
export const useSellerAccountCreationService = async (data: ISellerData) => {
    try {
        const accessToken = Cookies.get("accessToken");
        const fd = new FormData();
        fd.append("storeName", data.storeName);
        fd.append("businessEmail", data.businessEmail);
        fd.append("address", data.address);
        fd.append("contact", JSON.stringify(data.contact));
        // fd.append("imageUrl", data.imageUrl);
        const response = await axios.post(
            "http://localhost:3000/api/seller/create",
            fd,
            {
                withCredentials: true,
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
