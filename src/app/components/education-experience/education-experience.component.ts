import { Component, Input, OnInit } from '@angular/core';
import { Education } from 'src/app/model/Education';
import { Experience } from 'src/app/model/Experience';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
    selector: 'app-education-experience',
    templateUrl: './education-experience.component.html',
    styleUrls: ['./education-experience.component.css']
})
export class EducationExperienceComponent implements OnInit {

    @Input() educations: Education[] = []
    @Input() experiences: Experience[] = []

    constructor(private authService: AuthenticationService) {
        // console.log(this.experiences)
    }

    ngOnInit(): void {
    }

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}
