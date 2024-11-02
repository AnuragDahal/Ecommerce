const API_BASE_URL = "http://localhost:3000/api";

export const API_ROUTES = {
    PRODUCTS: {
        GET_ALL: `${API_BASE_URL}/products`,
        GET_ONE: (id: string) => `${API_BASE_URL}/products/${id}`,
        CREATE: `${API_BASE_URL}/products`,
        UPDATE: (id: string) => `${API_BASE_URL}/products/${id}`,
        DELETE: (id: string) => `${API_BASE_URL}/products/${id}`,
    },
    AUTH: {
        SIGNUP: `${API_BASE_URL}/auth/signup`,
        REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
        GET_ROLE: `${API_BASE_URL}/auth/get-role`,
        CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,
        LOGIN: `${API_BASE_URL}/auth/login`,
        VERIFY: `${API_BASE_URL}/auth/verify`,
        FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
        RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
        CHANGE_ACCOUNT_TYPE: `${API_BASE_URL}/auth/upgrade-account`,
    },
};
