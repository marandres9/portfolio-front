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
    ) {}

    ngOnInit(): void {}

    toggleEditingEdu() {
        this.editingEdu = !this.editingEdu;
    }
    toggleEditingExp() {
        this.editingExp = !this.editingExp;
    }

    public isLoggedIn() {
        return this.authService.isLoggedIn;
    }

    deleteEducation(ed: Education) {
        // An HttpClient method does not begin its HTTP request until you call
        // .subscribe() on the observable returned by that method
        const op = () => {
            this.http.deleteEducation(ed.id).subscribe(() => {
                let index = this.educations.findIndex(
                    (value) => value.id === ed.id
                );
                this.educations.splice(index, 1);
            });
        };

        this.authService.performServerOperation(op);
    }

    updateEducation(ed: Education) {
        const op = () => {
            this.http.updateEducation(ed).subscribe((ed) => {
                let index = this.educations.findIndex(
                    (value) => value.id === ed.id
                );
                this.educations.splice(index, 1, ed);
            });
        };

        this.authService.performServerOperation(op);
    }

    saveEducation(ed: Education) {
        const op = () => {
            this.http.saveEducation(ed).subscribe(() => window.location.reload());
        }

        this.authService.performServerOperation(op)
    }

    deleteExperience(exp: Experience) {
        const op = () => {
            this.http.deleteExperience(exp.id).subscribe(() => {
                let index = this.experiences.findIndex(
                    (value) => value.id === exp.id
                );
                this.experiences.splice(index, 1);
            });
        }

        this.authService.performServerOperation(op)

    }

    updateExperience(exp: Experience) {
        const op = () => {
            this.http.updateExperience(exp).subscribe((exp) => {
                let index = this.experiences.findIndex(
                    (value) => value.id === exp.id
                );
                console.log(exp);
                this.experiences.splice(index, 1, exp);
            });
        }

        this.authService.performServerOperation(op)

    }

    saveExperience(exp: Experience) {
        // sends post requeset and reloads the page to get updated list
        const op = () => {
            this.http.saveExperience(exp).subscribe(() => window.location.reload());
        }

        this.authService.performServerOperation(op)

    }
}
