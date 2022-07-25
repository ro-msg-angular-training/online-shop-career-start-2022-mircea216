import { AuthentificationState } from "./auth.state";
import { CartState } from "./cart.state";
import { ProductState } from "./product.state";

export interface AppState {
    products: ProductState;
    authentificationState: AuthentificationState,
    cart: CartState
}