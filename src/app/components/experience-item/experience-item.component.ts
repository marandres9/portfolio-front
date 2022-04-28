import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-experience-item',
    templateUrl: './experience-item.component.html',
    styleUrls: ['./experience-item.component.css']
})
export class ExperienceItemComponent implements OnInit {

    @Input() title: string = 'Senior graphic design specialist'
    @Input() period: string = '2019 - Present'
    @Input() company: string = 'a company'
    @Input() location: string = 'Experion, New York, NY '
    @Input() description: string

    items: string[]

    constructor() {
        this.description ='Lead in the design, development, and implementation of the graphic, layout, and production communication materials. Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project. Supervise the assessment of all graphic materials in order to ensure quality and accuracy of the design.  Oversee the efficient use of production project budgets ranging from $2,000 - $25,000'
        this.items = this.description.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")
    }

    ngOnInit(): void {
    }

}
