import ProductDetailCard from "@/components/reuseable/ProductDetailCard";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
    const { id } = useParams();
    interface Product {
        id: string;
        title: string;
        price: number;
        description: string;
        images: string[];
        category: string;
        sellerid: {
            _id: string;
        };
    }

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        (async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/${
                    import.meta.env.VITE_PRODUCT
                }/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                }
            );
            setProduct(response.data.data); // Assuming response.data is an object
        })();
    }, [id]);

    return (
        <>
            {product && (
                <ProductDetailCard
                    sellerId={product.sellerid._id}
                    productId={id as string}
                    name={product.title}
                    price={product.price}
                    images={product.images.map((image) => ({
                        src: image,
                    }))}
                    description={product.description}
                    category={product.category}
                />
            )}
        </>
    );
};

export default SingleProduct;
