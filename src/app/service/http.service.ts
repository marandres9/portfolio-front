import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Home } from 'src/app/model/Home';
import { Education } from '../model/Education';
import { About } from '../model/About';
import { PortfolioDTO } from '../model/PortfolioDTO';
import { Skill } from '../model/Skill';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    url = 'http://localhost:8080'

    constructor(private http: HttpClient) { }

    public getPortfolio() {
        return this.http.get<PortfolioDTO>(this.url + '/portfolio/get')
    }

    // === HOME ===
    public updateHome(title: string, description: string) {
        return this.http.put<Home>(`${this.url}/portfolio/edit/home/update/`, {}, {params: {'title': title, 'description': description}})
    }

    // === ABOUT ===
    public updateAbout(description: string) {
        return this.http.put<About>(`${this.url}/portfolio/edit/about/update/`, {}, {params: {'description': description}})
    }

    // === SKILLS ===
    public deleteSkill(id: number) {
        return this.http.delete<Skill>(this.url + `/portfolio/edit/skills/delete/${id}`)
    }

    public updateSkill(id:number, title: string, value: number) {
        return this.http.put<Skill>(`${this.url}/portfolio/edit/skills/update/${id}`, {}, {params: {'title': title, 'value': value}})
    }

    public saveSkill(skill: Skill) {
        return this.http.post<Skill>(`${this.url}/portfolio/edit/skills/save`, skill)
    }

    // === EDUCATION ===
    public deleteEducation(id: number) {
        return this.http.delete(`${this.url}/portfolio/edit/education/delete/${id}`)
    }

    public updateEducation(id: number, title: string, period: string, institution: string, location: string, description: string) {
        return this.http.put<Education>(
            `${this.url}/portfolio/edit/education/update/${id}`,
            {},
            {params: {
                'title': title,
                'period': period,
                'institution': institution,
                'location': location,
                'description': description
            }}
        )
    }

    public saveEducation(ed: Education) {
        return this.http.post<Education>(`${this.url}/portfolio/edit/education/save`, ed)
    }

    // !!! HANDLE HTTP ERRORS
}
