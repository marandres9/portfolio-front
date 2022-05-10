import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Experience } from 'src/app/model/Experience';

@Component({
    selector: 'app-experience-item',
    templateUrl: './experience-item.component.html',
    styleUrls: ['./experience-item.component.css']
})
export class ExperienceItemComponent implements OnInit, OnChanges {

    // @Input() title: string = 'Senior graphic design specialist'
    // @Input() period: string = '2019 - Present'
    // @Input() company: string = 'a company'
    // @Input() location: string = 'Experion, New York, NY '
    // @Input() description: string

    @Input() experience: Experience = new Experience('', '', '', '', '')

    items: string[]

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        this.items = this.experience.description.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")
    }
}
