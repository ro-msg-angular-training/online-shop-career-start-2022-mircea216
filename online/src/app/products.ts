export interface Product {
    id: number;
    name: string;
    category: string;
    image: string;
    price: number;
    description: string;
}

export interface ProductViewModel {
    id: number;
    name: string;
    category: string;
    price: number;
}

export interface ProductWithoutId {
    name: string;
    category: string;
    image: string;
    price: number;
    description: string;
}

