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

    private readonly TOKEN_NAME = 'token'

    constructor(private http: HttpService, private router: Router) {
        // for page reloads, checks if a token is available and updates the login state
        this._isLoggedIn.next(!!this.token)
        // !!!INCOMPLETE - Should check token expiration
    }

    login(loginReq: AuthenticationRequest) {
        return this.http.login(loginReq).pipe(
            // login() devuelve el observable de tipo AuthResponse
            // el observable es encadenado con pipe para acceder a su valor con tap()
            // Luego el observable sigue su rumbo normal
            tap((authResponse) => {
                console.log(authResponse)
                if(typeof authResponse === 'object') {
                    sessionStorage.setItem(this.TOKEN_NAME, authResponse['token']);
                    // updates the login-state
                    this._isLoggedIn.next(true)
                }
            },
            )
        ).pipe(catchError((err) => {
            // si el usuario falla en la autenticacion el request y la funcion tap van a
            // devolver errores que van a ser atrapados por esta funcion antes de devolver
            // el error al componente de login. Si se atrapa un error se devuelve un arreglo
            // vaio ([]) y no se actualiza el estado _isLoggedIn
            return of([])
        }));
    }

    logout() {
        sessionStorage.removeItem(this.TOKEN_NAME);
        // remove token and update beahviour-subject
        this._isLoggedIn.next(false)
    }

    get token() {
        return sessionStorage.getItem(this.TOKEN_NAME)
    }

}
