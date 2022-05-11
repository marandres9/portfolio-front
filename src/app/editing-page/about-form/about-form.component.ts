import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { About } from 'src/app/model/About';

@Component({
    selector: 'app-about-form',
    templateUrl: './about-form.component.html',
    styleUrls: ['./about-form.component.css'],
})
export class AboutFormComponent implements OnInit, OnChanges {
    @Input() description: string;

    @Output() updateEvent = new EventEmitter<About>()

    aboutForm = new FormGroup({
        description: new FormControl('')
    })

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        let desc = changes['description'].currentValue;

        if (desc != null) {
            this.setAbout();
        }
    }

    setAbout() {
        this.aboutForm.setValue({
            description: this.description,
        });
    }

    onAboutUpdate(desc: string) {
        this.updateEvent.emit(new About(desc))
    }
}
