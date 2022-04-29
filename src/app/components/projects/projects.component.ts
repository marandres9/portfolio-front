import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/model/Project';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    @Input() projects: Project[]

    constructor(private authService: AuthenticationService) { }

    ngOnInit(): void {
    }

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}
