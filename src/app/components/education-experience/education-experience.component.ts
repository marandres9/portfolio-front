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

    editingEdu = false;
    editingExp = false;

    constructor(
        private authService: AuthenticationService,
        private http: HttpService
    ) {
        // console.log(this.experiences)
    }

    ngOnInit(): void {}

    toggleEditingEdu() {
        this.editingEdu = !this.editingEdu;
    }
    toggleEditingExp() {
        this.editingExp = !this.editingExp;
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

    deleteExperience(exp: Experience) {
        this.http.deleteExperience(exp.id).subscribe(() => {
            let index = this.experiences.findIndex(
                (value) => value.id === exp.id
            );
            this.experiences.splice(index, 1);
        });
    }

    updateExperience(exp: Experience) {
        this.http
            .updateEducation(
                exp.id,
                exp.title,
                exp.period,
                exp.institution,
                exp.location,
                exp.description
            )
            .subscribe((exp) => {
                let index = this.experiences.findIndex(
                    (value) => value.id === exp.id
                );
                this.experiences.splice(index, 1, exp);
            });
    }

    saveExperience(exp: Experience) {
        // sends post requeset and reloads the page to get updated list
        this.http.saveExperience(exp).subscribe(() => window.location.reload());
    }
}
