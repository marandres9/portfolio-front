import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
} from '@angular/forms';
import { Experience } from 'src/app/model/Experience';

@Component({
    selector: 'app-experience-form',
    templateUrl: './experience-form.component.html',
    styleUrls: ['./experience-form.component.css'],
})
export class ExperienceFormComponent implements OnInit, OnChanges {
    @Input() experiences: Experience[];

    @Input() editing: boolean = false;
    // emition of this event tells parent to stop editing
    @Output() stopEditing = new EventEmitter();

    @Output() deleteEvent = new EventEmitter<Experience>();
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
        console.log(this.experienceFormArray.get([1])?.value);
        console.log(typeof this.experienceFormArray.get([1])?.value);

        this.showNewForm = !this.showNewForm;
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        let exp = changes['experiences'];
        if (exp && exp.currentValue) {
            this.setExperience();
        }

        if (changes['editing']) {
            this.changeFormState();
        }
    }

    changeFormState() {
        this.editing
            ? this.experienceForm.enable()
            : this.experienceForm.disable();
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
        this.experienceForm.disable();
    }

    onExperienceDelete(form: AbstractControl, index: number) {
        this.deleteEvent.emit(form.value);
        this.experienceFormArray.removeAt(index);
    }

    onExperienceUpdate(form: AbstractControl) {
        // !!!TEST - En vez de recibir los parametros por separado recibe el FormGroup
        // la estructura del Form debe ser igual al modelo de Experience porqu se pasa
        // directamente como tal
        this.updateEvent.emit(form.value);
    }

    onExperienceSave(form: AbstractControl) {
        this.saveEvent.emit(form.value);
    }

    get experienceFormArray() {
        return this.experienceForm.get('experience') as FormArray;
    }
}
