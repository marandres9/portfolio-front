import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { About } from 'src/app/model/About';

@Component({
    selector: 'app-about-form',
    templateUrl: './about-form.component.html',
    styleUrls: ['./about-form.component.css'],
})
export class AboutFormComponent implements OnInit, OnChanges {
    @Input() description: string;

    @Input() editing: boolean = false;
    // emition of this event tells parent to stop editing
    @Output() stopEditing = new EventEmitter()

    @Output() updateEvent = new EventEmitter<About>()

    aboutForm = new FormGroup({
        description: new FormControl('', Validators.required)
    })

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        let desc = changes['description'];
        if (desc && desc.currentValue) {
            this.setAbout();
        }

        let edit = changes['editing']
        if(edit) {
            this.changeFormState()
        }
    }

    changeFormState() {
        this.editing ? this.aboutForm.enable() : this.aboutForm.disable();
    }

    setAbout() {
        this.aboutForm.setValue({
            description: this.description,
        });
    }

    onAboutUpdate() {
        this.updateEvent.emit(this.aboutForm.value)
        this.stopEditing.emit()
    }

    cancelChanges() {
        this.setAbout()
        this.stopEditing.emit()
    }

    get aboutDescription() {
        return this.aboutForm.get('description')
    }

}
