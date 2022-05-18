import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private authService: AuthenticationService, private router: Router) { }

    ngOnInit(): void { }

    public isLoggedIn() {
        return this.authService.isLoggedIn;
    }

    login() {
        this.router.navigate(['/login'])
    }
    logout() {
        this.authService.logout()
    }

}
