import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { AuthenticationRequest } from '../model/AuthenticationRequest';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { AuthenticationResponse } from '../model/AuthenticationResponse';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    // behavior subject to keep track of the login state
    private _isLoggedIn = new BehaviorSubject<boolean>(false);
    // observable of the login state. Publicly available so components can subscribe to it
    // (using async pipe) and display content accordingly
    isLoggedIn = this._isLoggedIn.asObservable();

    private readonly TOKEN_NAME = 'token';

    constructor(private http: HttpService, private router: Router) {
        // for page reloads, checks if a token is available or expired and updates the login state
        if (this.isTokenExpired()) {
            this._isLoggedIn.next(false);
        } else {
            this._isLoggedIn.next(true);
        }
    }

    isTokenExpired() {
        if (this.token) {
            const expiry = JSON.parse(atob(this.token.split('.')[1])).exp;
            return Math.floor(new Date().getTime() / 1000) >= expiry;
        } else {
            // if no token is not found returns true so user is logged out
            return true;
        }
    }

    login(loginReq: AuthenticationRequest) {
        return this.http
            .login(loginReq)
            .pipe(
                // login() devuelve el observable de tipo AuthResponse
                // el observable es encadenado con pipe para acceder a su valor con tap()
                // Luego el observable sigue su rumbo normal
                tap((authResponse) => {
                    sessionStorage.setItem(
                        this.TOKEN_NAME,
                        authResponse['token']
                    );
                    // updates the login-state
                    this._isLoggedIn.next(true);
                })
            )
            .pipe(
                catchError((err) => {
                    // si el usuario falla en la autenticacion el request y la funcion tap van a
                    // devolver errores que van a ser atrapados por esta funcion antes de devolver
                    // el error al componente de login. Si se atrapa un error se devuelve un arreglo
                    // vaio ([]) y no se actualiza el estado _isLoggedIn
                    return of([]);
                })
            );
    }

    logout() {
        sessionStorage.removeItem(this.TOKEN_NAME);
        // remove token and update beahviour-subject
        this._isLoggedIn.next(false);
    }

    performServerOperation(operation: Function) {
        // for requests that require authentication
        // checks if token is available and not expired and calls the operation function
        if (this.isTokenExpired()) {
            alert('Error encountered - Credentials expired or unavailable');
            window.location.reload();
        } else {
            operation();
        }    }

    get token() {
        return sessionStorage.getItem(this.TOKEN_NAME);
    }
}
