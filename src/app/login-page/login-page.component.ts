import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private authService: AuthenticationService, private router: Router) {}

    ngOnInit(): void {}

    get username() {
        return this.loginForm.get('username');
    }
    get password() {
        return this.loginForm.get('password');
    }

    nav() {
        this.router.navigate(['/home'])

    }

    onLogin() {
        this.authService.login(this.loginForm.value).subscribe((data) => {
            this.router.navigate(['/home'])
        });
    }
}
