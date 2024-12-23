export interface ProductType {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
}

export interface ICart {
    products: Array<{
        productId: string;
        quantity: number;
        sellerId: string;
        price: number;
        color?: string;
        image?: Array<string>;
    }>;
}
