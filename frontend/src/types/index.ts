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
export interface IOrder {
    items: {
        productId: string;
        sellerId: string;
        price: number;
        quantity: number;
    }[];
    shippingAddress?: IShippingAddress | null;
    paymentMethod?: string;
}

export interface PaymentIntentResponse {
    data: {
        paymentIntentId: string;
        shipping: {
            address: IShippingAddress;
            name: string;
            phone: string;
            amount?: number;
        };
    };
}

export interface IShippingAddress {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
}

export interface IFetchedProfile {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatar: string;
}
