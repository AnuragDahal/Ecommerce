import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
    message: {
        id?: string | number;
        title: string;
        description: string;
        price: number;
        images: string[];
    };
    number: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ message, number }) => {
    const navigate = useNavigate();
    return (
        <>
            <Card
                className="max-w-[22rem] w-full hover:cursor-pointer"
                key={number}
                onClick={() => {
                    navigate(`/products/${message.id}`);
                }}
            >
                <CardHeader>
                    <img
                        src={message.images[1]}
                        alt={`dummy`}
                        className="w-full h-48 object-contain rounded-md"
                    />
                </CardHeader>
                <CardContent className="flex flex-col gap-2 h-20 overflow-clip">
                    <CardTitle className="font-semibold">
                        {message.title.length > 35
                            ? message.title.slice(0, 35) + "..."
                            : message.title}
                    </CardTitle>
                    <CardDescription className="text-left h[200px]">
                        {message.description.length > 46
                            ? message.description.slice(0, 46) + "..."
                            : message.description}
                    </CardDescription>
                </CardContent>
                <CardFooter className="w-full flex justify-between items-center space-y-2">
                    <p className="text-2xl font-bold">${message.price}</p>
                    {/*<Button variant={"default"} size="sm">*/}
                    {/*    Add to Cart*/}
                    {/*</Button>*/}
                </CardFooter>
            </Card>
        </>
    );
};

export default ProductCard;
