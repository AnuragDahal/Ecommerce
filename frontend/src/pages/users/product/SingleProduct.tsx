import { useParams } from "react-router-dom";

const SingleProduct = () => {
    const { id } = useParams();

    return (
        <>
            <h1 className="text-4xl font-bold">
                Single Product Page `Product ID: ${id}`
            </h1>
        </>
    );
};

export default SingleProduct;
