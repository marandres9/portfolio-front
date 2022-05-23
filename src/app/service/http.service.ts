import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Home } from 'src/app/model/Home';
import { Education } from '../model/Education';
import { About } from '../model/About';
import { PortfolioDTO } from '../model/PortfolioDTO';
import { Skill } from '../model/Skill';
import { Experience } from '../model/Experience';
import { Project } from '../model/Project';
import { AuthenticationRequest } from '../model/AuthenticationRequest';
import { AuthenticationResponse } from '../model/AuthenticationResponse';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    url = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    public getPortfolio() {
        // console.log(`retrieved ${sessionStorage.getItem('currentUser')} from sesStorage`)
        // return this.http.get<PortfolioDTO>(this.url + '/portfolio/get', {headers: {'Authorization': `Bearer ${sessionStorage.getItem('currentUser')}`}})
        return this.http.get<PortfolioDTO>(this.url + '/portfolio/get');
    }

    // === LOGIN ===
    public login(loginReq: AuthenticationRequest) {
        return this.http.post<AuthenticationResponse>(
            `${this.url}/auth`,
            loginReq
        );
    }

    // === HOME ===
    public updateHome(home: Home) {
        console.log('sending' + JSON.stringify(home));
        return this.http.put<Home>(
            `${this.url}/portfolio/edit/home/update/`,
            home
        );
    }

    // === ABOUT ===
    public updateAbout(about: About) {
        return this.http.put<About>(
            `${this.url}/portfolio/edit/about/update/`,
            about
        );
    }

    // === SKILLS ===
    public deleteSkill(id: number) {
        return this.http.delete<Skill>(
            this.url + `/portfolio/edit/skills/delete/${id}`
        );
    }

    public updateSkill(skill: Skill) {
        return this.http.put<Skill>(
            `${this.url}/portfolio/edit/skills/update/${skill.id}`,
            skill
        );
    }

    public saveSkill(skill: Skill) {
        return this.http.post<Skill>(
            `${this.url}/portfolio/edit/skills/save`,
            skill
        );
    }

    // === EDUCATION ===
    public deleteEducation(id: number) {
        return this.http.delete(
            `${this.url}/portfolio/edit/education/delete/${id}`
        );
    }

    public updateEducation(ed: Education) {
        return this.http.put<Education>(
            `${this.url}/portfolio/edit/education/update/${ed.id}`,
            ed
        );
    }

    public saveEducation(ed: Education) {
        return this.http.post<Education>(
            `${this.url}/portfolio/edit/education/save`,
            ed
        );
    }

    // === EXPERIENCE ===
    public deleteExperience(id: number) {
        return this.http.delete<Experience>(
            `${this.url}/portfolio/edit/experience/delete/${id}`
        );
    }

    public updateExperience(exp: Experience) {
        return this.http.put<Experience>(
            `${this.url}/portfolio/edit/experience/update/${exp.id}`,
            exp
        );
    }

    public saveExperience(exp: Experience) {
        return this.http.post<Experience>(
            `${this.url}/portfolio/edit/experience/save`,
            exp
        );
    }

    // === PROJECTS ===
    public deleteProject(id: Number) {
        return this.http.delete<Project>(
            `${this.url}/portfolio/edit/projects/delete/${id}`
        );
    }

    public updateProject(proj: Project) {
        return this.http.put<Project>(
            `${this.url}/portfolio/edit/projects/update/${proj.id}`,
            proj
        );
    }

    public saveProject(proj: Project) {
        return this.http.post<Project>(
            `${this.url}/portfolio/edit/projects/save`,
            proj
        );
    }

    // !!! HANDLE HTTP ERRORS
}
