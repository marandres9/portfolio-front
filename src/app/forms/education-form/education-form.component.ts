import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder } from '@angular/forms';
import { Education } from 'src/app/model/Education';
import { Experience } from 'src/app/model/Experience';

@Component({
    selector: 'app-education-form',
    templateUrl: './education-form.component.html',
    styleUrls: ['./education-form.component.css'],
})
export class EducationFormComponent implements OnInit, OnChanges {
    @Input() educations: Education[];

    @Input() editing: boolean = false;
    // emition of this event tells parent to stop editing
    @Output() stopEditing = new EventEmitter();

    @Output() deleteEvent = new EventEmitter<Education>();
    @Output() updateEvent = new EventEmitter<Education>();
    @Output() saveEvent = new EventEmitter<Education>();

    educationForm = this.fb.group({
        education: this.fb.array([]),
    });

    newEducationForm = this.fb.group({
        title: [''],
        period: [''],
        institution: [''],
        location: [''],
        description: [''],
    });
    showNewForm = false;
    toggleNewForm() {
        this.showNewForm = !this.showNewForm;
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        let education = changes['educations'];
        if (education && education.currentValue) {
            this.setEducation();
        }

        if(changes['editing']) {
            this.changeFormState()
        }
    }

    changeFormState() {
        this.editing ? this.educationForm.enable() : this.educationForm.disable();
    }

    setEducation() {
        for (let ed of this.educations) {
            this.educationFormArray.push(
                this.fb.group({
                    id: [ed.id],
                    title: [ed.title],
                    period: [ed.period],
                    institution: [ed.institution],
                    location: [ed.location],
                    description: [ed.description],
                })
            );
        }
        this.educationForm.disable()
    }

    onEducationDelete(form: AbstractControl, index: number) {
        this.deleteEvent.emit(form.value);

        this.educationFormArray.removeAt(index);
    }

    onEducationUpdate(form: AbstractControl) {
        this.updateEvent.emit(form.value);
        this.stopEditing.emit()
    }

    onEducationSave(form: AbstractControl) {
        this.saveEvent.emit(form.value);
        this.stopEditing.emit()
    }

    get educationFormArray() {
        return this.educationForm.get('education') as FormArray;
    }
}
