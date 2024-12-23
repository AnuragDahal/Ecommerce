import axios from "axios";
import Cookies from "js-cookie";

interface IOrder {
    items: {
        productId: string;
        sellerId: string;
        price: number;
        quantity: number;
    }[];
    shippingAddress?: string;
    paymentMethod?: string;
}
export const getUserOrders = async () => {
    try {
        const accessToken = Cookies.get("accessToken");
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_USER
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

export const placeUserOrder = async (order: IOrder) => {
    try {
        const accessToken = Cookies.get("accessToken");
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_USER
            }/orders`,
            {
                orderDetails: order.items,
                shippingAddress: order.shippingAddress ?? "",
                paymentMethod: order.paymentMethod ?? "",
            },
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
        }
        throw new Error("Network Error");
    }
};
