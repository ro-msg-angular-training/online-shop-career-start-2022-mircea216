import { Injectable } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    addProduct, addProductError, addProductSuccess, getProduct, updateProduct, updateProductError,
    updateProductSuccess, getProductSucces, loadProducts, loadProductsFailure, loadProductsSuccess,
    removeProduct, removeProductError, removeProductSucces
} from "../actions/product.actions";
import { from, of } from "rxjs";
import { switchMap, map, catchError, concatMap } from 'rxjs/operators';
import { Product } from "src/app/products";


@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProducts),
            switchMap(() =>
                from(this.productService.getProducts()).pipe(
                    map((products) => loadProductsSuccess({ products: products })),
                    catchError((error) => of(loadProductsFailure({ error })))
                )
            )
        )
    );

    saveProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addProduct),
            switchMap((action) => this.productService.saveProduct(action.product)
                .pipe(
                    map((product: any) => addProductSuccess({ product })),
                    catchError((response) => of(addProductError({ response })))
                )
            ),
        ),
    );

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeProduct),
            switchMap((action) => this.productService.deleteProduct(action.id)
                .pipe(map(() => action.id),
                    map(id => removeProductSucces({ id })),
                    catchError((response) => of(removeProductError({ response })))
                )),
        ),
    );

    getProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getProduct),
            concatMap((action) => this.productService.getProductById(action.id)),
            map((product) => getProductSucces({ product: product })))
    );


    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateProduct),
            switchMap((action) => this.productService.updateProduct(action.product, action.id)
                .pipe(map(() => action.product),
                    map((product: Product) => updateProductSuccess({ product })),
                    catchError((response) => of(updateProductError({ response })))
                )
            ),
        ),
    )
}

