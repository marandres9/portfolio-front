import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortfolioDTO } from '../model/PortfolioDTO';
import { HttpService } from '../service/http.service';
import { PortfolioService } from '../service/portfolio.service';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {

    public portfoioDto = new PortfolioDTO();

    constructor(private http: HttpService, private portfolioService: PortfolioService) { }

    ngOnInit(): void {
        this.getPortfolio();
    }

    ngOnDestroy(): void {
        this.portfolioService.portfolio = this.portfoioDto
    }

    public getPortfolio() {
        this.http.getPortfolio()
            .subscribe(portfolioDto => {
                this.portfoioDto = portfolioDto
            })
    }

}
