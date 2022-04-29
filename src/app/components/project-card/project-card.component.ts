import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/model/Project';

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

    @Input() title: string = 'Card title'
    @Input() description: string = 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
    @Input() link: string;

    @Input() project: Project = new Project('', '')

    constructor() { }

    ngOnInit(): void {
    }

}
