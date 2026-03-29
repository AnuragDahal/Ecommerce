export interface ProductType {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    category?: string;
    seller?: {
        storeName: string;
        businessEmail: string;
    };
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

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  role: 'user' | 'seller' | 'admin';
  avatar?: string;
  address?: string;
  phoneNumber?: string;
}

export interface IFetchedProfile {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatar: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    totalQuantity: number;
    sellerId: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductFilters {
    category: string;
    price: string;
    search: string;
    page: number;
    limit: number;
}

export interface CreateProductDTO {
    name: string;
    price: number;
    description: string;
    totalQuantity: number;
    category: string;
    images: File[];
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Toast {
    id: string;
    title: string;
    description?: string;
    variant?: 'default' | 'destructive' | 'success';
}
