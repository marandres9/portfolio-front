import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PortfolioDTO } from '../model/PortfolioDTO';
import { HttpService } from '../service/http.service';
import { PortfolioService } from '../service/portfolio.service';

@Component({
    selector: 'app-editing-page',
    templateUrl: './editing-page.component.html',
    styleUrls: ['./editing-page.component.css']
})
export class EditingPageComponent implements OnInit {

    portfolio = new PortfolioDTO();

    homeForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl('')
    })
    // try using a functino that returns the controls

    hardSkillsForm: FormGroup[] = []

    constructor(
        private http: HttpService,
        private portfolioService: PortfolioService
    ) { }

    ngOnInit(): void {
        this.getIfEmpty()
    }

    updateForm(): void {
        // this.homeForm.get('title')?.setValue(this.portfolio.home_title)
        // .setValue() sets all form-controls in the group

        // set home-form values
        this.homeForm.setValue({
            title: this.portfolio.home_title,
            description: this.portfolio.home_description
        })

        // set skills-form values
        for(let skill of this.portfolio.hardSkills) {
            console.log(skill)
            // push skills to form-group-array
            this.hardSkillsForm.push(new FormGroup({
                title: new FormControl(skill.title),
                value: new FormControl(skill.value)
            }))
        }
    }

    getIfEmpty(): void {
        // if a portfolioDTO already exists (when loading the home page) the
        // service passes the object to this page, if not, a new GET req is made
        if(this.portfolioService.isEmpty()) {
            // make http req
            console.log("portfolio is empty")
            this.http.getPortfolio().subscribe(portfolio => {
                this.portfolio = portfolio
                console.log(this.portfolio)
                // updates displayed values
                this.updateForm()
            })
        } else {
            // get from service
            console.log("portfolio not empty")
            this.portfolio = this.portfolioService.portfolio
            // updates displayed values
            this.updateForm()
        }
    }
}
