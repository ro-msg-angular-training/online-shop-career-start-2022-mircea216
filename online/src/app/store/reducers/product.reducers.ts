import { createReducer, on } from "@ngrx/store";
import { initialState } from "../state/product.state";
import { addProduct, removeProduct, loadProducts, loadProductsSuccess, loadProductsFailure, getProduct, updateProduct, getProductSucces } from "../actions/product.actions";

export const productReducer = createReducer(
    initialState,

    on(addProduct, (state, { product }) => ({
        ...state,
        products: [...state.products, product],
        status: 'loading'
    })),

    on(removeProduct, (state, { id }) => ({
        ...state,
        products: state.products.filter((product) => product.id !== id),
    })),

    on(getProduct, (state) => ({
        ...state,
        status: 'loading',
    }
    )),


    on(getProductSucces, (state, { product }) => ({
        ...state,
        status: 'success',
        selectedProduct: product
    }
    )),


    on(loadProducts, (state) => ({
        ...state,
        status: 'loading'
    })),

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
    })),
    on(updateProduct, (state) => ({
        ...state,
        status: 'loading'
    })
    ))