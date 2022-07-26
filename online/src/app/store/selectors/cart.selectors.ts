import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { CartState } from "../state/cart.state";

export const cartState = (state: AppState) => state.cart;

export const ordersSelector = createSelector(
    cartState,
    (state: CartState) => state.productOrders
)