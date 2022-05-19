import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortfolioDTO } from '../model/PortfolioDTO';
import { HttpService } from '../service/http.service';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

    public portfoioDto = new PortfolioDTO();

    constructor(private http: HttpService) { }

    ngOnInit(): void {
        this.getPortfolio();
    }

    public getPortfolio() {
        this.http.getPortfolio()
            .subscribe((portfolioDto) => {
                this.portfoioDto = portfolioDto
            })
        }

}
