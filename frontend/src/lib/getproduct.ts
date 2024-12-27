import axios from "axios";
import Cookies from "js-cookie";

interface IProductFilter {
    category: string;
    limit?: number;
    price: string;
    page?: number;
    search?: string;
    latest?: boolean;
}

export const getFeaturedProducts = async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_PRODUCT}`,
        {
            params: {
                latest: true,
                limit:12,
            },
            headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        }
    );
    return response.data.data.products;
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
                    price: data.price ? data.price : "low",
                    limit: data.limit ?? 6,
                    page: data.page ?? 1,
                    search: data.search,
                },
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            }
        );

        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw new Error("Network Error");
        }
    }
};
