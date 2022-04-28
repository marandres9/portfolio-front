import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Home } from 'src/app/model/Home';
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
}
