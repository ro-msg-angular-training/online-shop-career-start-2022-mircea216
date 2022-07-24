import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/products";
import { ProductViewModel } from "src/app/products";

export const getProduct = createAction(
    '[Product] Get Product',
    props<{ id: number }>()
)

export const getProductSucces = createAction(
    '[Product] Get Product Success',
    props<{ product: Product }>()
)

export const getProductError = createAction(
    '[Product] Get Product Error',
    props<{ response: HttpErrorResponse }>()
)

export const addProduct = createAction(
    '[Product] Add Product',
    props<{ product: Product }>()
)

export const addProductSuccess = createAction(
    '[Product] Add Product Success',
    props<{ product: Product }>()
)

export const addProductError = createAction(
    '[Product] Add Product Error',
    props<{ response: HttpErrorResponse }>()
)

export const removeProduct = createAction(
    '[Product] Remove Product',
    props<{ id: number }>()
)

export const removeProductSucces = createAction(
    '[Product] Remove Product Success',
    props<{ id: number }>()
)

export const removeProductError = createAction(
    '[Product] Remove Product Error',
    props<{ response: HttpErrorResponse }>()
)

export const loadProducts = createAction(
    '[Product] Load Products'
)


export const loadProductsSuccess = createAction(
    '[Product] Load Products Success',
    props<{ products: ProductViewModel[] }>()
);

export const loadProductsFailure = createAction(
    '[Product] Load Products Failure',
    props<{ error: string }>()
);

export const updateProduct = createAction(
    '[Product] Update Product',
    props<{ product: Product, id: number }>()
)

export const updateProductSuccess = createAction(
    '[Product] Update Product Success',
    props<{ product: Product }>()
)

export const updateProductError = createAction(
    '[Product] Update Product Error',
    props<{ response: HttpErrorResponse }>()
)