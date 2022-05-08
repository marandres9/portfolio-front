import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PortfolioDTO } from '../model/PortfolioDTO';
import { Skill } from '../model/Skill';
import { HttpService } from '../service/http.service';
import { PortfolioService } from '../service/portfolio.service';

@Component({
    selector: 'app-editing-page',
    templateUrl: './editing-page.component.html',
    styleUrls: ['./editing-page.component.css']
})
export class EditingPageComponent implements OnInit {

    portfolio = new PortfolioDTO();

    portfolioForm = this.fb.group({
        home: this.fb.group({
            title: [''],
            description: ['']
        }),
        hardSkills: this.fb.array([]),
        softSkills: this.fb.array([])
    })

    // addSkillForm: FormGroup = this.fb.group({})
    showAddSkillForm = false
    addSkillForm = this.fb.group({
        title: [''],
        value: [''],
        softSkill: ['']
    })

    constructor(
        private http: HttpService,
        private fb: FormBuilder,
        private portfolioService: PortfolioService
    ) { }

    ngOnInit(): void {
        this.getIfEmpty()
    }

    updateForm(): void {
        // set home-form values
        this.setHome()

        // set hard-skills-form values
        this.setHardSkills()
        // set soft-skill-form values
        this.setSoftSkills()
    }

    getIfEmpty(): void {
        // if a portfolioDTO already exists (when loading the home page) the
        // service passes the object to this page, if not, a new GET req is made
        if (this.portfolioService.isEmpty()) {
            // make http req
            console.log("portfolio is empty")
            this.http.getPortfolio().subscribe(portfolio => {
                this.portfolio = portfolio
                console.log(this.portfolio)

                this.updateForm()
            })
        } else {
            // get from service
            console.log("portfolio not empty")
            this.portfolio = this.portfolioService.portfolio

            this.updateForm()
        }
    }

    // === HOME ===
    setHome() {
        this.homeForm.setValue({
            title: this.portfolio.home_title,
            description: this.portfolio.home_description
        })
    }

    onHomeUpdate() {
        let title: string = this.homeForm.get('title')?.value
        let description: string = this.homeForm.get('description')?.value

        this.http.updateHome(title, description).subscribe()
    }

    // === SKILLS ===
    onSkillsDelete(form: AbstractControl, index: number) {
        let id = form.get('id')?.value
        let isSoftSkill = form.get('softSkill')?.value

        if (isSoftSkill) {
            this.softSkillsForm.removeAt(index)
        } else {
            this.hardSkillsForm.removeAt(index)
        }
        // An HttpClient method does not begin its HTTP request until you call
        // .subscribe() on the observable returned by that method
        this.http.deleteSkill(id).subscribe()
    }

    onSkillsUpdate(index: number, control: AbstractControl) {
        let id: number = control.get('id')?.value
        let title: string = control.get('title')?.value
        let value: number = control.get('value')?.value

        this.http.updateSkill(id, title, value).subscribe()
    }

    onSkillsSave() {
        let form = this.addSkillForm

        let title: string = form.get('title')?.value
        let value: number = form.get('value')?.value
        let softSkill: boolean = form.get('softSkill')?.value

        let skill = new Skill(title, value, softSkill)
        // console.log(skill)
        this.http.saveSkill(skill).subscribe((newSkill) => {
            if(newSkill.softSkill) {
                this.pushToFormArray(this.softSkillsForm, newSkill)
            } else {
                this.pushToFormArray(this.hardSkillsForm, newSkill)
            }
        })
        this.addSkillForm.reset()
        this.showAddSkillForm = !this.showAddSkillForm
    }

    get homeForm() {
        return this.portfolioForm.get('home') as FormGroup
    }
    get hardSkillsForm() {
        return this.portfolioForm.get('hardSkills') as FormArray
    }
    get softSkillsForm() {
        return this.portfolioForm.get('softSkills') as FormArray
    }

    setHardSkills() {
        for (let skill of this.portfolio.hardSkills) {
            // push skills to form-group-array
            this.pushToFormArray(this.hardSkillsForm, skill)
        }
    }
    setSoftSkills() {
        for (let skill of this.portfolio.softSkills) {
            // push skills to form-group-array
            this.pushToFormArray(this.softSkillsForm, skill)
        }
    }

    pushToFormArray(array: FormArray, skill: Skill) {
        array.push(this.fb.group({
            id: [skill.id],
            title: [skill.title],
            value: [skill.value],
            softSkill: [skill.softSkill]
        }))
    }
}
