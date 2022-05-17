import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { Skill } from 'src/app/model/Skill';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
    @Input() hardSkills: Skill[] = [];
    @Input() softSkills: Skill[] = [];

    editing = false;

    constructor(
        private authService: AuthenticationService,
        private http: HttpService
    ) {}

    ngOnInit(): void {}

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    toggleEditing() {
        this.editing = !this.editing;
        console.log(this.editing);
    }

    deleteSkill(skill: Skill) {
        this.http.deleteSkill(skill.id).subscribe(() => {
            if(skill.softSkill) {
                let index = this.softSkills.findIndex((value) => value.id === skill.id)
                this.softSkills.splice(index, 1)
            } else {
                let index = this.hardSkills.findIndex((value) => value.id === skill.id)
                this.hardSkills.splice(index, 1)
            }
        })
    }

    updateSkill(skill: Skill) {
        this.http
            .updateSkill(skill.id, skill.title, skill.value)
            .subscribe((skill) => {
                if(skill.softSkill) {
                    let index = this.softSkills.findIndex((value) => value.id == skill.id)

                    this.softSkills.splice(index, 1, skill)
                } else {
                    let index = this.hardSkills.findIndex((value) => value.id == skill.id)

                    this.hardSkills.splice(index, 1, skill)
                }
            });
    }

    saveSkill(skill: Skill) {
        this.http.saveSkill(skill).subscribe(() => {
            window.location.reload()
        });
    }
}
