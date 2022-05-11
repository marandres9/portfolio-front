import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { About } from '../model/About';
import { Education } from '../model/Education';
import { Experience } from '../model/Experience';
import { Home } from '../model/Home';
import { PortfolioDTO } from '../model/PortfolioDTO';
import { Project } from '../model/Project';
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
        education: this.fb.array([]),
        experience: this.fb.array([]),
        projects: this.fb.array([])
    })

    // forms to add new skill
    showAddSkillForm = false
    addSkillForm = this.fb.group({
        title: [''],
        value: [''],
        softSkill: ['']
    })
    // forms to add new education/experience
    showAddEdExpForm = false
    addEdExpForm = this.fb.group({
        id: [''],
        title: [''],
        period: [''],
        institution: [''],
        location: [''],
        description: [''],
        isExperience: ['']
    })
    // forms to add new project
    showAddProjectForm = false
    toggleAddProjectForm() {
        this.showAddProjectForm = !this.showAddProjectForm
    }
    addProjectForm = this.fb.group({
        id: [''],
        title: [''],
        description: [''],
        url: ['']
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
        // set experience-form values
        this.setExperience()
        // set projects-form values
        this.setProjects()
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

    updateHome(home: Home) {
        this.http.updateHome(home.title, home.description).subscribe()
    }

    // === ABOUT ===
    setAbout() {
        this.aboutForm.setValue({
            description: this.portfolioDto.about_description
        })
    }

    updateAbout(about: About) {
        this.http.updateAbout(about.description).subscribe()
    }

    // === SKILLS ===
    deleteSkill(id: number) {
        // An HttpClient method does not begin its HTTP request until you call
        // .subscribe() on the observable returned by that method
        this.http.deleteSkill(id).subscribe()
    }

    updateSkill(skill: Skill) {
        this.http.updateSkill(skill.id, skill.title, skill.value).subscribe()
    }

    saveSkill(skill: Skill) {
        // console.log(skill)
        this.http.saveSkill(skill).subscribe()
        this.addSkillForm.reset()
        this.showAddSkillForm = !this.showAddSkillForm
        window.location.reload()
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

    onEducationExperienceSave() {
        let form = this.addEdExpForm

        let title: string = form.get('title')?.value
        let period: string = form.get('period')?.value
        let institution: string = form.get('institution')?.value
        let location: string = form.get('location')?.value
        let description: string = form.get('description')?.value

        let isExperience: boolean = form.get('isExperience')?.value

        if(isExperience) {
            let exp = new Experience(title, period, institution, location, description)
            console.log(exp)
            this.http.saveExperience(exp).subscribe((newExp) => {
                this.pushExperienceToFomArray(this.experienceForm, newExp)
            })
        } else {
            let ed = new Education(title, period, institution, location, description)
            console.log(ed)
            this.http.saveEducation(ed).subscribe((newEd) => {
                this.pushEducationToFomArray(this.educationForm, newEd)
            })
        }
        // reset and hide form
        this.addEdExpForm.reset()
        this.showAddEdExpForm = !this.showAddEdExpForm
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

    // === EXPERIENCE ===
    setExperience() {
        for(let exp of this.portfolioDto.experiences) {
            this.pushExperienceToFomArray(this.experienceForm, exp)
        }
    }

    onExperienceDelete(form: AbstractControl, index: number) {
        let id = form.get('id')?.value

        this.experienceForm.removeAt(index)
        this.http.deleteExperience(id).subscribe()
    }

    onExperienceUpdate(control: AbstractControl, index: number) {
        let id: number = control.get('id')?.value
        let title: string = control.get('title')?.value
        let period: string = control.get('period')?.value
        let institution: string = control.get('institution')?.value
        let location: string = control.get('location')?.value
        let description: string = control.get('description')?.value

        this.http.updateExperience(id, title, period, institution, location, description).subscribe()
    }

    pushExperienceToFomArray(array: FormArray, exp: Experience) {
        array.push(this.fb.group({
            id: [exp.id],
            title: [exp.title],
            period: [exp.period],
            institution: [exp.institution],
            location: [exp.location],
            description: [exp.description]
        }))
    }

    // === PROJECTS ===
    setProjects() {
        for(let proj of this.portfolioDto.projects) {
            this.pushProjectToFomArray(this.projectsForm, proj)
        }
    }

    onProjectDelete(form: AbstractControl, index: number) {
        let id = form.get('id')?.value

        this.projectsForm.removeAt(index)
        this.http.deleteProject(id).subscribe()
    }

    onProjectUpdate(control: AbstractControl, index: number) {
        let id: number = control.get('id')?.value
        let title: string = control.get('title')?.value
        let description: string = control.get('description')?.value
        let url: string = control.get('url')?.value

        this.http.updateProject(id, title, description, url).subscribe()
    }

    onProjectSave() {
        let form = this.addProjectForm

        let title: string = form.get('title')?.value
        let description: string = form.get('description')?.value
        let url: string = form.get('url')?.value

        let proj = new Project(title, description, url)
        console.log(proj)

        this.http.saveProject(proj).subscribe((newProj) => {
            this.pushProjectToFomArray(this.projectsForm, newProj)
        })
        this.addProjectForm.reset()
        this.toggleAddProjectForm()
    }

    pushProjectToFomArray(array: FormArray, proj: Project) {
        array.push(this.fb.group({
            id: [proj.id],
            title: [proj.title],
            description: [proj.description],
            url: [proj.url]
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
    get experienceForm() {
        return this.portfolioForm.get('experience') as FormArray
    }
    get projectsForm() {
        return this.portfolioForm.get('projects') as FormArray
    }
}
