import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/model/Skill';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

    @Input() skills: Skill[]

    softSkills: Skill[] = [
        new Skill('Team work', 10),
        new Skill('Communication', 20),
        new Skill('Problem solving', 30),
        new Skill('Organization', 40)]

    constructor(private authService: AuthenticationService) {
    }

    ngOnInit(): void {}

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}
