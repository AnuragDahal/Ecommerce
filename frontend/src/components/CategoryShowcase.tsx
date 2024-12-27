import { Link } from "react-router-dom";

const CategoryShowCase = () => {
    const categories = [
        {
            name: "Men's Fashion",
            image: "/mensfashion.jpg",
            link: "/products?category=Clothes",
        },
        {
            name: "Women's Fashion",
            image: "/women.jpg",
            link: "/category/womens",
        },
        {
            name: "Accessories",
            image: "/accessories.jpg",
            link: "/products?category=Accessories",
        },
        {
            name: "Footwear",
            image: "/footwear.jpg",
            link: "/products?category=Shoes",
        },
    ];

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-8 md:text-4xl">
                    Shop By Category
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <Link
                            to={category.link}
                            key={index}
                            className="group relative overflow-hidden rounded-lg transition-transform hover:scale-105"
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="inset-0 bg-black/40 flex items-center justify-center">
                                <h3 className="text-xl font-medium">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowCase;
