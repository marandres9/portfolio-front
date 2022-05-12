import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Experience } from 'src/app/model/Experience';

@Component({
    selector: 'app-experience-form',
    templateUrl: './experience-form.component.html',
    styleUrls: ['./experience-form.component.css'],
})
export class ExperienceFormComponent implements OnInit, OnChanges {
    @Input() experiences: Experience[];

    @Output() deleteEvent = new EventEmitter<number>();
    @Output() updateEvent = new EventEmitter<Experience>();
    @Output() saveEvent = new EventEmitter<Experience>();

    experienceForm = this.fb.group({
        experience: this.fb.array([]),
    });

    newExperienceForm = this.fb.group({
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
        let exp = changes['experiences'].currentValue;
        if (exp != null) {
            this.setExperience();
        }
    }

    setExperience() {
        for (let exp of this.experiences) {
            this.experienceFormArray.push(
                this.fb.group({
                    id: [exp.id],
                    title: [exp.title],
                    period: [exp.period],
                    institution: [exp.institution],
                    location: [exp.location],
                    description: [exp.description],
                })
            );
        }
    }

    onExperienceDelete(id: number, index: number) {
        this.deleteEvent.emit(id)
        this.experienceFormArray.removeAt(index)
    }

    onExperienceUpdate(
        id: number,
        title: string,
        period: string,
        institution: string,
        location: string,
        description: string
    ) {
        this.updateEvent.emit(new Experience(id, title, period, institution, location, description))
    }

    onExperienceSave(
        title: string,
        period: string,
        institution: string,
        location: string,
        description: string
    ) {
        this.saveEvent.emit(new Experience(0, title, period, institution, location, description))
    }


    get experienceFormArray() {
        return this.experienceForm.get('experience') as FormArray;
    }
}
