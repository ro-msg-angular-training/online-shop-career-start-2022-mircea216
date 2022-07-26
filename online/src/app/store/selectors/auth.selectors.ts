import { createSelector } from "@ngrx/store";
import { admin, customer } from "src/app/utils";
import { AppState } from "../state/app.state";
import { AuthentificationState } from "../state/auth.state";

export const authRoleState = (state: AppState) => state.authentificationState;

export const adminRoleSelector = createSelector(
    authRoleState,
    (state: AuthentificationState) => state.loggedUser?.roles.includes(admin) || false
);

export const customerRoleSelector = createSelector(
    authRoleState,
    (state: AuthentificationState) => state.loggedUser?.roles.includes(customer) || false
);

