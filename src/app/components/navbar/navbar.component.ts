import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private authService: AuthenticationService) { }

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    ngOnInit(): void {
    }

}
