import { API_ROUTES } from '@/constants/apiRoutes';
import axios from 'axios';


export const getFeaturedProducts = async()=>{

    const response = await axios.get(API_ROUTES.PRODUCTS,{
        params:{
            offset:73,
            limit:6
        }
    });
    return response.data;

}

export const getRandomProducts = async()=>{

    const response = await axios.get(API_ROUTES.PRODUCTS)

    return response.data;
}

