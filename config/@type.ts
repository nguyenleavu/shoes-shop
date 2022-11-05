interface colors {
    color: string;
    image: string;
}

export interface ProductType {
    id: string;
    type: string;
    name: string;
    code: string;
    introduce: string;
    price: number | undefined;
    description: string;
    vote?: number;
    image: string;
    color: string[];
    other: string[];
}

export interface ProductsOrderType {
    color: string;
    colorText: string;
    id: string;
    image: string;
    introduce: string;
    name: string;
    price: number;
    quantity: number;
    size: number;
}

export interface OrderType {
    city: string;
    date: string;
    district: string;
    fullAddress: string;
    houseNumber: string;
    id: string;
    name: string;
    phone: string;
    price: number;
    products: ProductsOrderType[];
    status: string;
    userId: string;
}
