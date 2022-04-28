import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-education-item',
    templateUrl: './education-item.component.html',
    styleUrls: ['./education-item.component.css']
})
export class EducationItemComponent implements OnInit {

    @Input() title: string = 'Master of Fine Arts & Graphic Design'
    @Input() period: string = '2015 - 2016'
    @Input() institution: string = 'Rochester Institute of Technology'
    @Input() location: string = 'Rochester, NY'
    @Input() description: string = 'Qui deserunt veniam. Et sed aliquam labore tempore sed quisquam iusto autem sit. Ea vero voluptatu qui ut dignissimos deleniti nerada porti sand markend'

    constructor() { }

    ngOnInit(): void {
    }

}
