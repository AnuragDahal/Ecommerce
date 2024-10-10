import { API_ROUTES } from "@/config/apiRoutes";
import axios from "axios";

export const getFeaturedProducts = async () => {
    const response = await axios.get(API_ROUTES.PRODUCTS, {
        params: {
            offset: 4,
            limit: 6,
        },
    });
    return response.data;
};

export const getRandomProducts = async () => {
    const response = await axios.get(API_ROUTES.PRODUCTS);

    return response.data;
};
