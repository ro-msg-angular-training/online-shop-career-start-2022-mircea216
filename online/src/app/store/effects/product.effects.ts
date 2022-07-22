import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProductService } from "src/app/services/product.service";
import { AppState } from "../state/app.state";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addProduct, loadProducts, loadProductsFailure, loadProductsSuccess, removeProduct } from "../actions/product.actions";
import { selectAllProducts } from "../selectors/product.selectors";
import { from, of } from "rxjs";
import { switchMap, map, catchError, withLatestFrom, flatMap, mergeMap } from 'rxjs/operators';


@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private productService: ProductService
    ) { }
    // productService
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProducts),
            switchMap(() =>
                // Call the getTodos method, convert it to an observable
                from(this.productService.getProducts()).pipe(
                    // Take the returned value and return a new success action containing the todos
                    map((products) => loadProductsSuccess({ products: products })),
                    // Or... if it errors return a new failure action containing the error
                    catchError((error) => of(loadProductsFailure({ error })))
                )
            )
        )
    );

    saveProducts$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(addProduct, removeProduct),
                withLatestFrom(this.store.select(selectAllProducts)),
                switchMap(([action, products]) => from(this.productService.saveProduct(products)))
            ),
        // Most effects dispatch another action, but this one is just a "fire and forget" effect
        { dispatch: false }
    );
}