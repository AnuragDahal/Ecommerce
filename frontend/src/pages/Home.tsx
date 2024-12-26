import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "@/lib/getproduct";
import Loading from "@/components/reuseable/Loading";
import NetworkError from "@/components/reuseable/NetworkError";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryShowcase from "@/components/CategoryShowcase";
import NewArrivals from "@/components/NewArrivals";
// import PromoBanner from "@/components/PromoBanner";

const Home = () => {
    const { status, data: products } = useQuery({
        queryKey: ["products"],
        queryFn: getFeaturedProducts,
    });

    if (status === "pending") {
        return <Loading />;
    }

    if (status === "error") {
        return <NetworkError />;
    }

    return (
        <div className="min-h-screen bg-background">
            <HeroCarousel products={products.slice(0, 5)} />
            <div className="flex w-full justify-center">
                <NewArrivals products={products} />
            </div>

            <div className="w-full ">
                <CategoryShowcase />
            </div>
            {/* <PromoBanner /> */}
        </div>
    );
};

export default Home;
