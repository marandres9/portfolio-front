import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
    selector: 'app-education-experience',
    templateUrl: './education-experience.component.html',
    styleUrls: ['./education-experience.component.css']
})
export class EducationExperienceComponent implements OnInit {

    constructor(private authService: AuthenticationService) { }

    ngOnInit(): void {
    }

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}
