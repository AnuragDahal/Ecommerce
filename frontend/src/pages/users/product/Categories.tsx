import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const categories = [
        { name: "Electronics", icon: "💻" },
        { name: "Accessories", icon: "🎧" },
        { name: "Clothes", icon: "👕" },
        { name: "Beauty", icon: "💄" },
        { name: "Shoes", icon: "👟" },
    ];

    const navigate = useNavigate();
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">
                    Product Categories
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                    {categories.map((category, index) => (
                        <Card
                            key={index}
                            className="hover:shadow-lg transition-shadow duration-200 border-4"
                        >
                            <div className="p-6 space-y-8">
                                <h2 className="text-2xl flex items-center justify-center mb-4">
                                    <span className="mr-2 text-4xl">
                                        {category.icon}
                                    </span>
                                    {category.name}
                                </h2>
                                <div className="flex justify-center">
                                    <Button
                                        variant={"cta"}
                                        className="md:w-full"
                                        onClick={() =>
                                            navigate(
                                                `/products?category=${category.name}&Z&limit=3`
                                            )
                                        }
                                    >
                                        Explore {category.name}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Categories;
