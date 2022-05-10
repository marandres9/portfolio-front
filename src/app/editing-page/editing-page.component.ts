import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Education } from '../model/Education';
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

    portfolioDto = new PortfolioDTO();

    portfolioForm = this.fb.group({
        home: this.fb.group({
            title: [''],
            description: ['']
        }),
        about: this.fb.group({
            description: ['']
        }),
        hardSkills: this.fb.array([]),
        softSkills: this.fb.array([]),
        education: this.fb.array([])
    })

    // forms to add new skill
    showAddSkillForm = false
    addSkillForm = this.fb.group({
        title: [''],
        value: [''],
        softSkill: ['']
    })
    // forms to add new education/experience
    showAddEducationForm = false
    addEducationForm = this.fb.group({
        id: [''],
        title: [''],
        period: [''],
        institution: [''],
        location: [''],
        description: ['']
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
        // set about-form values
        this.setAbout()
        // set hard-skills-form values
        this.setHardSkills()
        // set soft-skill-form values
        this.setSoftSkills()
        // set education-form values
        this.setEducation()
    }

    getIfEmpty(): void {
        // if a portfolioDTO already exists (when loading the home page) the
        // service passes the object to this page, if not, a new GET req is made
        if (this.portfolioService.isEmpty()) {
            // make http req
            console.log("portfolio is empty")
            this.http.getPortfolio().subscribe(portfolio => {
                this.portfolioDto = portfolio
                console.log(this.portfolioDto)

                this.updateForm()
            })
        } else {
            // get from service
            console.log("portfolio not empty")
            this.portfolioDto = this.portfolioService.portfolio

            this.updateForm()
        }
    }

    // === HOME ===
    setHome() {
        this.homeForm.setValue({
            title: this.portfolioDto.home_title,
            description: this.portfolioDto.home_description
        })
    }

    onHomeUpdate() {
        let title: string = this.homeForm.get('title')?.value
        let description: string = this.homeForm.get('description')?.value

        this.http.updateHome(title, description).subscribe()
    }

    // === ABOUT ===
    setAbout() {
        this.aboutForm.setValue({
            description: this.portfolioDto.about_description
        })
    }

    onAboutUpdate() {
        let description: string = this.aboutForm.get('description')?.value

        this.http.updateAbout(description).subscribe()
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

    onSkillsUpdate(control: AbstractControl, index: number) {
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
                this.pushSkillToFormArray(this.softSkillsForm, newSkill)
            } else {
                this.pushSkillToFormArray(this.hardSkillsForm, newSkill)
            }
        })
        this.addSkillForm.reset()
        this.showAddSkillForm = !this.showAddSkillForm
    }

    setHardSkills() {
        for (let skill of this.portfolioDto.hardSkills) {
            // push skills to form-group-array
            this.pushSkillToFormArray(this.hardSkillsForm, skill)
        }
    }
    setSoftSkills() {
        for (let skill of this.portfolioDto.softSkills) {
            // push skills to form-group-array
            this.pushSkillToFormArray(this.softSkillsForm, skill)
        }
    }

    pushSkillToFormArray(array: FormArray, skill: Skill) {
        array.push(this.fb.group({
            id: [skill.id],
            title: [skill.title],
            value: [skill.value],
            softSkill: [skill.softSkill]
        }))
    }

    // === EDUCATION ===
    setEducation() {
        for(let ed of this.portfolioDto.educations) {
            this.pushEducationToFomArray(this.educationForm, ed)
        }
    }
    onEducationDelete(form: AbstractControl, index: number) {
        let id = form.get('id')?.value

        this.educationForm.removeAt(index)
        // An HttpClient method does not begin its HTTP request until you call
        // .subscribe() on the observable returned by that method
        this.http.deleteEducation(id).subscribe()
    }

    onEducationUpdate(control: AbstractControl, index: number) {
        let id: number = control.get('id')?.value
        let title: string = control.get('title')?.value
        let period: string = control.get('period')?.value
        let institution: string = control.get('institution')?.value
        let location: string = control.get('location')?.value
        let description: string = control.get('description')?.value

        this.http.updateEducation(id, title, period, institution, location, description).subscribe()
    }

    onEducationSave() {
        let form = this.addEducationForm

        let title: string = form.get('title')?.value
        let period: string = form.get('period')?.value
        let institution: string = form.get('institution')?.value
        let location: string = form.get('location')?.value
        let description: string = form.get('description')?.value

        let ed = new Education(title, period, institution, location, description)
        console.log(ed)
        this.http.saveEducation(ed).subscribe((newEducation) => {
            this.pushEducationToFomArray(this.educationForm, newEducation)
        })
        // reset and hide form
        this.addEducationForm.reset()
        this.showAddEducationForm = !this.showAddEducationForm
    }

    pushEducationToFomArray(array: FormArray, ed: Education) {
        array.push(this.fb.group({
            id: [ed.id],
            title: [ed.title],
            period: [ed.period],
            institution: [ed.institution],
            location: [ed.location],
            description: [ed.description]
        }))
    }

    get homeForm() {
        return this.portfolioForm.get('home') as FormGroup
    }
    get aboutForm() {
        return this.portfolioForm.get('about') as FormGroup
    }
    get hardSkillsForm() {
        return this.portfolioForm.get('hardSkills') as FormArray
    }
    get softSkillsForm() {
        return this.portfolioForm.get('softSkills') as FormArray
    }
    get educationForm() {
        return this.portfolioForm.get('education') as FormArray
    }

}
