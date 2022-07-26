import { HttpErrorResponse } from "@angular/common/http"
import { createAction, props } from "@ngrx/store"
import { ProductOrder } from "src/order"

export const placeOrder = createAction(
    '[Order] Place Order',
    props<{ id: number }>()
)

export const placeOrderSuccess = createAction(
    '[Order] Place Order Success',
)

export const placeOrderError = createAction(
    '[Order] Place Order Error',
    props<{ response: HttpErrorResponse }>()
)

export const checkoutRequest = createAction(
    '[Checkout] Checkout Success',
    props<{ productOrder: ProductOrder[] }>()
)

export const checkoutRequestSucces = createAction(
    '[Checkout] Checkout Success'
)

export const checkoutRequestError = createAction(
    '[Checkout] Checkout Error',
    props<{ response: HttpErrorResponse }>()
)