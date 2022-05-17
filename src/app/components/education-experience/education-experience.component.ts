import { Component, Input, OnInit } from '@angular/core';
import { Education } from 'src/app/model/Education';
import { Experience } from 'src/app/model/Experience';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
    selector: 'app-education-experience',
    templateUrl: './education-experience.component.html',
    styleUrls: ['./education-experience.component.css'],
})
export class EducationExperienceComponent implements OnInit {
    @Input() educations: Education[] = [];
    @Input() experiences: Experience[] = [];

    editing = false;

    constructor(
        private authService: AuthenticationService,
        private http: HttpService
    ) {
        // console.log(this.experiences)
    }

    ngOnInit(): void {}

    toggleEditing() {
        this.editing = !this.editing;
    }

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    deleteEducation(ed: Education) {
        // An HttpClient method does not begin its HTTP request until you call
        // .subscribe() on the observable returned by that method
        this.http.deleteEducation(ed.id).subscribe(() => {
            let index = this.educations.findIndex(
                (value) => value.id === ed.id
            );
            this.educations.splice(index, 1);
        });
    }

    updateEducation(ed: Education) {
        this.http
            .updateEducation(
                ed.id,
                ed.title,
                ed.period,
                ed.institution,
                ed.location,
                ed.description
            )
            .subscribe((ed) => {
                let index = this.educations.findIndex(
                    (value) => value.id === ed.id
                );
                this.educations.splice(index, 1, ed);
            });
    }

    saveEducation(ed: Education) {
        // sends post requeset and reloads the page to get updated list
        this.http.saveEducation(ed).subscribe(() => window.location.reload());
    }
}
