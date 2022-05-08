import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Home } from 'src/app/model/Home';
import { Education } from '../model/Education';
import { PortfolioDTO } from '../model/PortfolioDTO';
import { Skill } from '../model/Skill';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    url = 'http://localhost:8080'

    constructor(private http: HttpClient) { }

    public getHome() {
        return this.http.get<Home>(this.url + '/home')
    }

    public getPortfolio() {
        return this.http.get<PortfolioDTO>(this.url + '/portfolio/get')
    }

    public getEducation() {
        return this.http.get<Education[]>(this.url + '/test/education')
    }

    public deleteSkill(id: number) {
        return this.http.delete<Skill>(this.url + `/portfolio/skills/delete/${id}`)
    }

    public updateSkill(id:number, title: string, value: number) {
        return this.http.put<Skill>(`${this.url}/skills/update/${id}`, {}, {params: {'title': title, 'value': value}})
    }

    public saveSkill(skill: Skill) {
        return this.http.post<Skill>(`${this.url}/skills/save`, skill)
    }
    // !!! HANDLE HTTP ERRORS
}
