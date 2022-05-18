import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/model/Project';

@Component({
    selector: 'app-projects-content',
    templateUrl: './projects-content.component.html',
    styleUrls: ['./projects-content.component.css'],
})
export class ProjectsContentComponent implements OnInit {
    @Input() projects: Project[];

    constructor() {}

    ngOnInit(): void {}
}
