import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    wrongCredentials = false;

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    get username() {
        return this.loginForm.get('username');
    }
    get password() {
        return this.loginForm.get('password');
    }

    nav() {
        this.router.navigate(['/home']);
    }

    onSubmit() {
        this.authService.login(this.loginForm.value).subscribe((data) => {
            this.authService.isLoggedIn.subscribe((loggedIn) => {
                console.log(`logged in?: ${loggedIn}`);
                if (loggedIn) {
                    this.router.navigate(['/home']);
                } else {
                    this.wrongCredentials = true;
                }
            });
        });
    }
}
