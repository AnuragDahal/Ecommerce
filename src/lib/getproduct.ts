import axios from 'axios';


export const getFeaturedProducts = async()=>{

    const response = await axios.get(`https://api.escuelajs.co/api/v1/products`,{
        params:{
            offset:3,
            limit:6
        }
    });
    return response.data;

}

export const getRandomProducts = async()=>{

    const response = await axios.get(`https://api.escuelajs.co/api/v1/products`)

    return response.data;
}