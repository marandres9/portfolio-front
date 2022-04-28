import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private authService: AuthenticationService) { }

    ngOnInit(): void { }

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}
