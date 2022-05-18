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
        return this.authService.isLoggedIn();
    }

    deleteProject(proj: Project) {
        this.http.deleteProject(proj.id).subscribe(() => {
            let index = this.projects.findIndex(
                (value) => value.id === proj.id
            );
            this.projects.splice(index, 1);
        });
    }

    updateProject(proj: Project) {
        this.http
            .updateProject(proj.id, proj.title, proj.description, proj.url)
            .subscribe((proj) => {
                let index = this.projects.findIndex(
                    (value) => value.id === proj.id
                );
                this.projects.splice(index, 1, proj);
            });
    }

    saveProject(proj: Project) {
        this.http.saveProject(proj).subscribe(() => window.location.reload());
    }
}
