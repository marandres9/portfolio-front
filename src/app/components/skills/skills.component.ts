import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

    constructor(private authService: AuthenticationService) { }

    ngOnInit(): void {
    }

    public isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}
