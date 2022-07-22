import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { ProductState } from "../state/product.state";

export const selectProducts = (state: AppState) => state.products;
export const selectAllProducts = createSelector(
    selectProducts,
    (state: ProductState) => state.products
);