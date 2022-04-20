import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    constructor(private authService: AuthenticationService) { }

    ngOnInit(): void {
    }

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}
