import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/model/Project';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
    @Input() projects: Project[];

    editing = false;

    constructor(
        private authService: AuthenticationService,
        private http: HttpService
    ) {}

    ngOnInit(): void {}

    toggleEditing() {
        this.editing = !this.editing;
    }

    public isLoggedIn() {
        return this.authService.isLoggedIn;
    }

    deleteProject(proj: Project) {
        const op = () => {
            this.http.deleteProject(proj.id).subscribe(() => {
                let index = this.projects.findIndex(
                    (value) => value.id === proj.id
                );
                this.projects.splice(index, 1);
            });
        };

        this.authService.performServerOperation(op);
    }

    updateProject(proj: Project) {
        const op = () => {
            this.http.updateProject(proj).subscribe((proj) => {
                let index = this.projects.findIndex(
                    (value) => value.id === proj.id
                );
                this.projects.splice(index, 1, proj);
            });
        };

        this.authService.performServerOperation(op);
    }

    saveProject(proj: Project) {
        const op = () => {
            this.http
                .saveProject(proj)
                .subscribe(() => window.location.reload());
        };

        this.authService.performServerOperation(op);
    }
}
