import ProductDetailCard from "@/components/reuseable/ProductDetailCard";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
    const { id } = useParams();

    return (
        <>
            <h1 className="text-4xl font-bold">
                Single Product Page `Product ID: ${id}`
            </h1>
            <ProductDetailCard
                name="Product Name"
                priceRange={{ min: 10, max: 20 }}
                description="Product Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet."
                colors={[
                    { name: "red", value: "red" },
                    { name: "blue", value: "blue" },
                    { name: "green", value: "green" },
                ]}
                images={[
                    {
                        color: "red",
                        src: "./images/red.jpg",
                    },
                    {
                        color: "blue",
                        src: "./images/blue.jpg",
                    },
                    {
                        color: "green",
                        src: "./images/green.jpg",
                    },
                ]}
                sku="SKU123"
                category="Category"
            />
        </>
    );
};

export default SingleProduct;
