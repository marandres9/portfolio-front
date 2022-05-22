import { Component, Input, OnInit } from '@angular/core';
import { Education } from 'src/app/model/Education';

@Component({
    selector: 'app-education-content',
    templateUrl: './education-content.component.html',
    styleUrls: ['./education-content.component.css'],
})
export class EducationContentComponent implements OnInit {
    @Input() educations: Education[] = [];

    constructor() {}

    ngOnInit(): void {}
}
