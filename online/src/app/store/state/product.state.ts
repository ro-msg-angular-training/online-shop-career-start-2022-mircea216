import { ProductViewModel } from "src/app/products";

export interface ProductState {
    products: ProductViewModel[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
};

export const initialState: ProductState = {
    products: [],
    error: '',
    status: 'pending'
};

