import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs";
import { ProductService } from "src/app/services/product.service";
import { checkoutRequest, checkoutRequestError, checkoutRequestSucces } from "../actions/cart.actions";
import { ofType } from "@ngrx/effects";
import { of } from "rxjs";

@Injectable()
export class CartEffects {

    constructor(
        private actions$: Actions,
        private productService: ProductService,
    ) { }

    checkout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(checkoutRequest),
            switchMap((action) => this.productService.checkout(action.productOrder)
                .pipe(
                    map(() => checkoutRequestSucces()),
                    catchError((response) => of(checkoutRequestError({ response })))
                )
            ),
        ),
    );

}