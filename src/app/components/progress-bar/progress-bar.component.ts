import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Skill } from 'src/app/model/Skill';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnChanges {

    @Input() skill: Skill = new Skill(0, '', 0, false);

    progress_container_style = 'height: 0.5em;'
    progress_bar_style: string;

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // el componente debe esperar a que el padre skills-component le pase el
        // valor 'value'. Se debe esperar a recibir dicho valor antes de setear
        // el width del componente, sino va a quedar solo con el valor inicializado
        // (ej: 0) y nunca se va a actualizar
        // this.skill = changes['skill'].currentValue
        this.progress_bar_style = `background-color: #c60021; width: ${this.skill.value}%`;
    }

}
