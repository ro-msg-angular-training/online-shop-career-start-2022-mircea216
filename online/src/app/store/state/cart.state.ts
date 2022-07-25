import { ProductOrder } from "src/order";

export interface CartState {
    productOrders: ProductOrder[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
};

export const initialCartState: CartState = {
    productOrders: [],
    error: '',
    status: "pending",
}