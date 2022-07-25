import { createReducer, on } from "@ngrx/store";
import { ProductOrder } from "src/order";
import { placeOrder } from "../actions/cart.actions";
import { initialCartState } from "../state/cart.state";

export const cartReducer = createReducer(
    initialCartState,

    on(placeOrder, (state, { id }) => {
        const placedOrder = state.productOrders.find(placedOrder => placedOrder.productId === id);
        if (placedOrder === undefined) {
            return {
                ...state,
                productOrders: [...state.productOrders, { productId: id, quantity: 1 }],
                status: 'success',
                error: "",
            };
        } else {
            const addedMultipleTimesProduct = { productId: id, quantity: placedOrder.quantity + 1 }
            return {
                ...state,
                productOrders: state.productOrders.map((item) => {
                    return item.productId === id
                        ? addedMultipleTimesProduct : item;
                }),
                status: 'success',
                error: "",
            };
        }
    }),

)



