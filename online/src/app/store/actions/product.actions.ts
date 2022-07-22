

// export enum EProductActions {
//     GetProducts = '[Product] Get Products',
//     GetProductsSuccess = '[Product] Get Products Success',
//     GetProduct = '[Product] Get Product',
//     GetProductSuccess = '[Product] Get Product Success',
// }

// export class GetProducts implements Action {
//     public readonly type = EProductActions.GetProducts;
// }

// export class GetProductsSuccess implements Action {
//     public readonly type = EProductActions.GetProductsSuccess;
//     constructor(public payload: Product[]) {

//     }
// }

// export class GetProduct implements Action {
//     public readonly type = EProductActions.GetProduct;
//     constructor(public payload: number) {

//     }
// }

// export class GetProductSuccess implements Action {
//     public readonly type = EProductActions.GetProductSuccess;
//     constructor(public payload: Product) {

//     }
// }

// export type ProductActions = GetProduct | GetProductSuccess | GetProducts | GetProductsSuccess;

import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/products";
import { ProductViewModel } from "src/app/products";

export const addProduct = createAction(
    '[Product] Add Product',
    props<{ product: Product }>()
)

export const removeProduct = createAction(
    '[Product] Add Product',
    props<{ id: number }>()
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
