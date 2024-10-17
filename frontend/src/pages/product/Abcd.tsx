import ProductDetialCard from "@/components/reuseable/ProductDetailCard";

const Abcd = () => {
    return (
        <div>
            <ProductDetialCard
                name="Product Name"
                priceRange={{ min: 100, max: 200 }}
                description="Product Description"
                colors={[
                    { name: "Red", value: "red" },
                    { name: "Blue", value: "blue" },
                    { name: "Green", value: "green" },
                ]}
                images={[
                    { color: "red", src: "https://via.placeholder.com/150" },
                    { color: "blue", src: "https://via.placeholder.com/150" },
                    { color: "green", src: "https://via.placeholder.com/150" },
                ]}
                sku="SKU123456"
                category="Clothing"
            />
        </div>
    );
};

export default Abcd;
