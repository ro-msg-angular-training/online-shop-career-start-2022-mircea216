import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, of, map, catchError, tap } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { User } from "src/app/user";
import { login, loginError, loginSuccess } from "../actions/auth.actions";

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthentificationService,
        private router: Router
    ) { }


    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            mergeMap(({ credentials }) => {
                return this.authService.login(credentials).pipe(
                    map((user: User) => loginSuccess({ user })),
                    catchError((response: HttpErrorResponse) => of(loginError({ response })))
                );
            })
        )
    )

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginSuccess),
                tap(() => {
                    alert('You are successfully logged in!')
                    this.router.navigateByUrl('/products');
                })
            ),
        { dispatch: false }
    );

    loginError$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginError),
                tap(() => alert('The credentials you introduced do not exist!'))
            ),
        { dispatch: false }
    );
}