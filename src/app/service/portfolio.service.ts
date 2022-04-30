import { Injectable } from '@angular/core';
import { PortfolioDTO } from '../model/PortfolioDTO';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    portfolio: PortfolioDTO = new PortfolioDTO()

    constructor() { }

    isEmpty() {
        if(
            this.portfolio.home_title ||
            this.portfolio.home_description ||
            this.portfolio.about_description ||
            this.portfolio.skills ||
            this.portfolio.educations ||
            this.portfolio.projects
            ) {
                return false
            } else {
                return true
        }
    }
}
