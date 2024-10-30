import ProductDetailCard from "@/components/reuseable/ProductDetailCard";
import { API_ROUTES } from "@/config/apiRoutes";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
        category: {
            name: string;
        };
    }

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        (async () => {
            const response = await axios.get(`${API_ROUTES.PRODUCTS}/${id}`);
            setProduct(response.data); // Assuming response.data is an object
        })();
    }, [id]);

    return (
        <>
            {product && (
                <ProductDetailCard
                    productId={product.id}
                    name={product.title}
                    price={product.price}
                    images={product.images.map((image) => ({
                        src: image,
                    }))}
                    description={product.description}
                    category={product.category.name}
                />
            )}
        </>
    );
};

export default SingleProduct;
