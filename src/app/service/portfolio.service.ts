import { Injectable } from '@angular/core';
import { PortfolioDTO } from '../model/PortfolioDTO';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    portfolioDto: PortfolioDTO = new PortfolioDTO()

    constructor() { }

    isEmpty() {
        // checks if its portfolio has any data
        if(
            this.portfolioDto.home_title ||
            this.portfolioDto.home_description ||
            this.portfolioDto.about_description ||
            this.portfolioDto.softSkills ||
            this.portfolioDto.hardSkills ||
            this.portfolioDto.educations ||
            this.portfolioDto.projects
            ) {
                return false
            } else {
                return true
        }
    }

    get portfolio() {
        return this.portfolioDto
    }

    set portfolio(portfolio: PortfolioDTO) {
        this.portfolioDto = portfolio
    }
}
