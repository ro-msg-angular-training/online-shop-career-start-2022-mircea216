import { createReducer, on } from "@ngrx/store";
import { initialState } from "../state/product.state";
import { addProduct, removeProduct, loadProducts, loadProductsSuccess, loadProductsFailure } from "../actions/product.actions";

export const productReducer = createReducer(
    initialState,
    on(addProduct, (state, { product }) => ({
        ...state,
        products: [...state.products, product],
    })),
    on(removeProduct, (state, { id }) => ({
        ...state,
        todos: state.products.filter((product) => product.id !== id),
    })),

    on(loadProducts, (state) => ({ ...state, status: 'loading' })),

    on(loadProductsSuccess, (state, { products }) => ({
        ...state,
        products: products,
        error: null,
        status: 'success',
    })),

    on(loadProductsFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error',
    }))
)