import { HttpErrorResponse } from "@angular/common/http"
import { createAction, props } from "@ngrx/store"
import { Credentials } from "src/app/credentials"
import { User } from "src/app/user"

export const login = createAction(
    '[User] Login',
    props<{ credentials: Credentials }>()
)

export const loginSuccess = createAction(
    '[User] Login Success',
    props<{ user: User }>()
)

export const loginError = createAction(
    '[User] Login Error',
    props<{ response: HttpErrorResponse }>()
)
