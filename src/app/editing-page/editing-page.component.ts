import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Home } from '../model/Home';
import { PortfolioDTO } from '../model/PortfolioDTO';
import { HttpService } from '../service/http.service';
import { PortfolioService } from '../service/portfolio.service';

@Component({
    selector: 'app-editing-page',
    templateUrl: './editing-page.component.html',
    styleUrls: ['./editing-page.component.css']
})
export class EditingPageComponent implements OnInit {

    portfolio = new PortfolioDTO();

    homeForm = new FormGroup({
        title: new FormControl(this.portfolio.home_title),
        description: new FormControl('')
    })

    constructor(
        private http: HttpService,
        private portfolioService: PortfolioService
    ) { }

    ngOnInit(): void {
        if(this.portfolioService.isEmpty()) {
            // make http req
            console.log("portfolio is empty")
            this.http.getPortfolio().subscribe(portfolio => {
                this.portfolio = portfolio
                console.log(this.portfolio)
                this.updateForm()
            })
        } else {
            // get from service
            console.log("portfolio not empty")
            this.portfolio = this.portfolioService.portfolio
            this.updateForm()
        }

    }

    updateForm(): void {
        this.homeForm.get('title')?.setValue(this.portfolio.home_title)
    }
}
