import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Education } from 'src/app/model/Education';
import { Experience } from 'src/app/model/Experience';

@Component({
    selector: 'app-education-form',
    templateUrl: './education-form.component.html',
    styleUrls: ['./education-form.component.css'],
})
export class EducationFormComponent implements OnInit, OnChanges {
    @Input() educations: Education[];

    @Output() deleteEvent = new EventEmitter<number>();
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
        let education = changes['educations'].currentValue;
        if (education != null) {
            this.setEducation();
        }
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
    }

    onEducationDelete(id: number, index: number) {
        this.deleteEvent.emit(id);

        this.educationFormArray.removeAt(index);
    }

    onEducationUpdate(
        id: number,
        title: string,
        period: string,
        institution: string,
        location: string,
        description: string
    ) {
        this.updateEvent.emit(
            new Education(id, title, period, institution, location, description)
        );
    }

    onEducationSave(
        title: string,
        period: string,
        institution: string,
        location: string,
        description: string
    ) {
        this.saveEvent.emit(
            new Education(0, title, period, institution, location, description)
        );
    }

    get educationFormArray() {
        return this.educationForm.get('education') as FormArray;
    }
}
