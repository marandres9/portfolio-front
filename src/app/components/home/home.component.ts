import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Home } from 'src/app/model/Home';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    profilePicPath: string = 'assets/img/profile-compressed-croped.jpg'

    @Input() title: string;
    @Input() description: string;

    editing = false;

    constructor(private authService: AuthenticationService, private http: HttpService) { }

    ngOnInit(): void {}

    public isLoggedIn() {
        return this.authService.isLoggedIn
    }

    toggleEditing() {
        this.editing = !this.editing
    }

    updateHome(home: Home) {
        this.http.updateHome(home.title, home.description).subscribe((home) => {
            this.title = home.title
            this.description = home.description
        });
    }

}
