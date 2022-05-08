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

    public getPortfolio() {
        return this.http.get<PortfolioDTO>(this.url + '/portfolio/get')
    }

    public updateHome(title: string, description: string) {
        return this.http.put<Home>(`${this.url}/home/update/`, {}, {params: {'title': title, 'description': description}})
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
