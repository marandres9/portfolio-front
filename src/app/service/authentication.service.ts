import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { AuthenticationRequest } from '../model/AuthenticationRequest';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    // behavior subject to keep track of the login state
    private _isLoggedIn = new BehaviorSubject<boolean>(false);
    // observable of the login state. Publicly available so components can subscribe to it
    // (using async pipe) and display content accordingly
    isLoggedIn = this._isLoggedIn.asObservable();

    private readonly TOKEN_NAME = 'token'

    constructor(private http: HttpService, private router: Router) {
        // for page reloads, checks if a token is available and updates the login state
        this._isLoggedIn.next(!!this.token)
        // !!!CHECK TOKEN EXPIRATION
    }

    login(loginReq: AuthenticationRequest) {
        return this.http.login(loginReq).pipe(
            // login() devuelve el observable de tipo AuthResponse
            // el observable es encadenado con pipe para acceder a su valor con tap()
            // Luego el observable sigue su rumbo normal
            tap((authResponse) => {
                sessionStorage.setItem(this.TOKEN_NAME, authResponse.token);
                // updates the login-state
                this._isLoggedIn.next(true)
            })
        );
    }

    logout() {
        sessionStorage.removeItem(this.TOKEN_NAME);
        // remove token and update beahviour subject
        this._isLoggedIn.next(false)
    }

    get token() {
        return sessionStorage.getItem(this.TOKEN_NAME)
    }

}
