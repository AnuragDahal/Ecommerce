import axios from "axios";
import Cookies from "js-cookie";

interface IProductFilter {
    category: string;
    limit?: number;
    page: number;
    price: string;
}

export const getFeaturedProducts = async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_PRODUCT}`,
        {
            params: {
                limit: 6,
            },
            headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        }
    );
    return response.data.data;
};

export const getRandomProducts = async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_PRODUCT}`
    );

    return response.data.data;
};

export const getProducts = async (data: IProductFilter) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_PRODUCT
            }`,
            {
                params: {
                    category: data.category,
                    limit: data.limit ? data.limit : 1,
                    page: data.page ? data.page : 1,
                    price: data.price ? data.price : "low",
                },
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
