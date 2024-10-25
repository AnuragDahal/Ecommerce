import axios from "axios";
import Cookies from "js-cookie";
interface IProductData {
    name: string;
    price: number;
    description: string;
    totalQuantity: number;
    category: string;
    images: File[];
}
interface IPaymentData {
    items: Array<{
        id: string;
        amount: number;
    }>;
}
export const useProductServices = () => {
    const createProduct = async (data: IProductData) => {
        const fd = new FormData();
        fd.append("name", data.name);
        fd.append("price", data.price.toString());
        fd.append("description", data.description);
        fd.append("totalQuantity", data.totalQuantity.toString());
        fd.append("category", data.category);
        data.images.forEach((file) => {
            fd.append("images", file);
        });

        try {
            const response = await axios.post(
                "http://localhost:3000/api/products/create",
                fd,
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
    const makePayment = async (data: IPaymentData) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/payment",
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
    return {
        createProduct,
        makePayment,
    };
};
