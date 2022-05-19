import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { Experience } from 'src/app/model/Experience';

@Component({
    selector: 'app-experience-item',
    templateUrl: './experience-item.component.html',
    styleUrls: ['./experience-item.component.css'],
})
export class ExperienceItemComponent implements OnInit, OnChanges {
    @Input() experience: Experience = new Experience(0, '', '', '', '', '');

    items: string[];

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        let exp = changes['experience'];
        if (exp && exp.currentValue) {
            this.items = this.experience.description
                .replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
                .split('|');
        }
    }
}
