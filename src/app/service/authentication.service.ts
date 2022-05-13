import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    uri = 'http://localhost:4200/login';
    token: any;

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, passwd: string) {
        this.http.post(this.uri + '/authenticate', {email: email, passwd: passwd})
        .subscribe((resp: any) => {
            this.router.navigate(['profile']);
            localStorage.setItem('token', resp.token);
        });
    }

    logout() {
        localStorage.removeItem('token');
    }

    public isLoggedIn(): boolean {
        // return localStorage.getItem('token') !== null;
        return false;
    }
}

