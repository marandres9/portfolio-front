import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    constructor(private authService: AuthenticationService) { }

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    ngOnInit(): void {
    }

}
