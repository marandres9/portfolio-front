import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/model/Experience';

@Component({
    selector: 'app-experience-content',
    templateUrl: './experience-content.component.html',
    styleUrls: ['./experience-content.component.css'],
})
export class ExperienceContentComponent implements OnInit {
    @Input() experiences: Experience[] = [];

    constructor() {}

    ngOnInit(): void {}
}
