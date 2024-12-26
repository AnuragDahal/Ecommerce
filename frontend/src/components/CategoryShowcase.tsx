const CategoryShowCase = () => {
    const categories = [
        {
            name: "Men's Fashion",
            image: "/logo.jpeg",
            link: "/category/mens",
        },
        {
            name: "Women's Fashion",
            image: "/api/placeholder/300/400",
            link: "/category/womens",
        },
        {
            name: "Accessories",
            image: "/api/placeholder/300/400",
            link: "/category/accessories",
        },
        {
            name: "Footwear",
            image: "/logo.jpeg",
            link: "/category/footwear",
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
                        <a
                            href={category.link}
                            key={index}
                            className="group relative overflow-hidden rounded-lg transition-transform hover:scale-105"
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <h3 className="text-white text-xl font-medium">
                                    {category.name}
                                </h3>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowCase;
