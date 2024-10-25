import ProductDetailCard from "@/components/reuseable/ProductDetailCard";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
    const { id } = useParams();

    return (
        <>
            <ProductDetailCard
                name="Product Name"
                priceRange={{ min: 10, max: 20 }}
                description="Product Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet."
                // colors={[
                //     { name: "red", value: "red" },
                //     { name: "blue", value: "blue" },
                //     { name: "green", value: "green" },
                // ]}
                images={[
                    {
                        color: "red",
                        src: "https://img.freepik.com/free-photo/portrait-young-happy-smiling-woman-model-with-bright-makeup-colorful-lips-with-two-pigtails-sunglasses-summer-red-clothes-isolated_158538-8672.jpg?t=st=1729754618~exp=1729758218~hmac=a90415f759af5dc4fd5ac1a9d4a62fd7daafc6239b779acec594bc23e668fe3f&w=996",
                    },
                    {
                        color: "blue",
                        src: "https://img.freepik.com/free-photo/woman-blue-shirt-standing-red-wall_144627-71309.jpg?t=st=1729754668~exp=1729758268~hmac=8359a943a150aec0ea5dd0e1add1af6fce6906d11f3120973896f880761c5525&w=996",
                    },
                    {
                        color: "green",
                        src: "https://img.freepik.com/free-photo/pretty-woman-posing-confident-way_23-2148974032.jpg?t=st=1729754722~exp=1729758322~hmac=bced4e16f6037ff6a0cd8c5be718896afa3983ca4a2fd03bdafa5a5240cb3875&w=740",
                    },
                ]}
                sku="SKU123"
                category="Category"
            />
        </>
    );
};

export default SingleProduct;
