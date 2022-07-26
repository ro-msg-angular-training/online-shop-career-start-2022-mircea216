import { createReducer, on } from "@ngrx/store";
import { login, loginSuccess } from "../actions/auth.actions";
import { initialAuthentificationState } from "../state/auth.state";

export const authReducer = createReducer(
    initialAuthentificationState,

    on(login, (state) => ({
        ...state,
        status: 'loading',
    }
    )),


    on(loginSuccess, (state, { user }) => ({
        ...state,
        loggedUser: user,
        status: 'success',
        error: ''
    }
    )),
)