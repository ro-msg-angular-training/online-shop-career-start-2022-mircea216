import { AuthentificationState } from "./auth.state";
import { ProductState } from "./product.state";

export interface AppState {
    products: ProductState;
    authentificationState: AuthentificationState
}