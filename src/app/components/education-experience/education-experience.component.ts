import { Component, Input, OnInit } from '@angular/core';
import { Education } from 'src/app/model/Education';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
    selector: 'app-education-experience',
    templateUrl: './education-experience.component.html',
    styleUrls: ['./education-experience.component.css']
})
export class EducationExperienceComponent implements OnInit {

    @Input() educations: Education[]

    constructor(private authService: AuthenticationService) { }

    ngOnInit(): void {
    }

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}
