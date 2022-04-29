import { Component, Input, OnInit } from '@angular/core';
import { Education } from 'src/app/model/Education';

@Component({
    selector: 'app-education-item',
    templateUrl: './education-item.component.html',
    styleUrls: ['./education-item.component.css']
})
export class EducationItemComponent implements OnInit {

    @Input() education: Education = new Education(0, '', '', '', '', '')

    constructor() { }

    ngOnInit(): void {
    }

}
