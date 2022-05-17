import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/model/Skill';

@Component({
    selector: 'app-skills-content',
    templateUrl: './skills-content.component.html',
    styleUrls: ['./skills-content.component.css'],
})
export class SkillsContentComponent implements OnInit {
    @Input() hardSkills: Skill[] = [];
    @Input() softSkills: Skill[] = [];

    constructor() {}

    ngOnInit(): void {}
}
