import { createReducer, on } from "@ngrx/store";
import {
    checkoutRequest, checkoutRequestError, checkoutRequestSucces, placeOrder, placeOrderSuccess, placeOrderError
} from "../actions/cart.actions";
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

    on(placeOrderSuccess, (state) => ({
        ...state,
        status: 'success',
        productOrders: [],
        error: null
    }

    )),

    on(placeOrderError, (state) => ({
        ...state,
        status: 'error',
        error: 'error'
    })),

    on(checkoutRequest, (state) => ({
        ...state,
        status: 'loading',
    }
    )),

    on(checkoutRequestSucces, (state) => ({
        ...state,
        productOrders: [],
        status: 'success',
        error: null,
    })),

    on(checkoutRequestError, (state) => ({
        ...state,
        status: 'error',
        error: 'error',
    })),
)



