import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { map, switchMap, mergeMap, concatMap, tap, from, withLatestFrom } from "rxjs";
import { ProductService } from "src/app/services/product.service";
import { placeOrder, placeOrderSuccess } from "../actions/cart.actions";
import { ofType } from "@ngrx/effects";
import { AppState } from "../state/app.state";
import { Store } from "@ngrx/store";
import { ordersSelector } from "../selectors/cart.selectors";

@Injectable()
export class CartEffects {

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private productService: ProductService,
    ) { }


}