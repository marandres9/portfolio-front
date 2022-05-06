import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Skill } from 'src/app/model/Skill';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

    @Input() hardSkills: Skill[] = []
    @Input() softSkills: Skill[] = []

    constructor(
        private authService: AuthenticationService
    ) {}

    ngOnInit(): void {}

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}
