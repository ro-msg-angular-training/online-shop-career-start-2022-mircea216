import { Product, ProductViewModel } from "src/app/products";

export interface ProductState {
    products: ProductViewModel[];
    selectedProduct: Product | undefined;
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
};

export const initialState: ProductState = {
    products: [],
    selectedProduct: undefined,
    error: '',
    status: 'pending',
};

