import { Component, Input, OnInit } from '@angular/core';
import { Home } from 'src/app/model/Home';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    profilePicPath: string = 'assets/img/profile.jpg'

    home = new Home();

    constructor(private authService: AuthenticationService, private http: HttpService) { }

    ngOnInit(): void {
        this.getHome();
    }

    public getHome() {
        this.http.getHome()
            .subscribe(data => {
                this.home = data;
            })
    }

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}
