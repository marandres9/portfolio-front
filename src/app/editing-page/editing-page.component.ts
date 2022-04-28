import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Home } from '../model/Home';
import { HttpService } from '../service/http.service';

@Component({
    selector: 'app-editing-page',
    templateUrl: './editing-page.component.html',
    styleUrls: ['./editing-page.component.css']
})
export class EditingPageComponent implements OnInit {

    home = new Home();

    homeForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl('')
    })

    constructor(private http: HttpService) { }

    ngOnInit(): void {
        this.getHome()
    }


    getHome() {
        this.http.getHome().subscribe(home => {
            this.home = home
            this.updateFormContent()
        })
    }

    updateFormContent() {
        this.homeForm.get('title')?.setValue(this.home.title)
        this.homeForm.get('description')?.setValue(this.home.description)
    }
}
