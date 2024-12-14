import axios from "axios";
import Cookies from "js-cookie";

interface IUserProfile {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    image: File | string;
}
export const getUserProfile = async () => {
    try {
        const accessToken = Cookies.get("accessToken");
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_USER
            }/profile`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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

export const handleUserProfileUpdate = async (data: Partial<IUserProfile>) => {
    try {
        const fd = new FormData();
        fd.append("firstName", data.firstName || "");
        fd.append("lastName", data.lastName || "");
        fd.append("address", data.address || "");
        fd.append("phoneNumber", data.phoneNumber || "");
        fd.append("image", data.image as File);
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_USER
            }/profile/update`,
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

