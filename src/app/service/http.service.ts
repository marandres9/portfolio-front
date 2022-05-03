import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Home } from 'src/app/model/Home';
import { Education } from '../model/Education';
import { PortfolioDTO } from '../model/PortfolioDTO';

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
        return this.http.delete(this.url + `/portfolio/skills/delete/${id}`)
    }
}
