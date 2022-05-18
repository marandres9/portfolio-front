import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Skill } from 'src/app/model/Skill';

@Component({
    selector: 'app-skills-form',
    templateUrl: './skills-form.component.html',
    styleUrls: ['./skills-form.component.css'],
})
export class SkillsFormComponent implements OnInit, OnChanges {
    @Input() softSkills: Skill[];
    @Input() hardSkills: Skill[];

    @Input() editing: boolean = false;
    // emition of this event tells parent to stop editing
    @Output() stopEditing = new EventEmitter();

    @Output() deleteEvent = new EventEmitter<Skill>();
    @Output() updateEvent = new EventEmitter<Skill>();
    @Output() saveEvent = new EventEmitter<Skill>();

    skillsForm = this.fb.group({
        softSkills: this.fb.array([]),
        hardSkills: this.fb.array([]),
    });

    newSkillForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(255)]],
        value: [
            '',
            [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        softSkill: [false],
    });
    showNewForm = false;
    toggleNewSkillForm() {
        this.showNewForm = !this.showNewForm;
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        let hardSkills = changes['hardSkills'];
        let softSkills = changes['softSkills'];
        if (
            hardSkills &&
            hardSkills.currentValue &&
            softSkills &&
            softSkills.currentValue
        ) {
            this.setSkills();
        }

        if (changes['editing']) {
            this.changeFormState();
        }
    }

    changeFormState() {
        this.editing ? this.skillsForm.enable() : this.skillsForm.disable();
    }

    pushSkillToFormArray(array: FormArray, skill: Skill) {
        array.push(
            this.fb.group({
                id: [skill.id],
                title: [
                    skill.title,
                    [Validators.required, Validators.maxLength(255)],
                ],
                value: [
                    skill.value,
                    [
                        Validators.required,
                        Validators.min(0),
                        Validators.max(100),
                    ],
                ],
                softSkill: [skill.softSkill],
            })
        );
    }

    setSkills() {
        this.setHardSkills();
        this.setSoftSkills();
        this.skillsForm.disable();
    }

    setHardSkills() {
        for (let skill of this.hardSkills) {
            // push skills to form-array
            this.pushSkillToFormArray(this.hardSkillsForm, skill);
        }
    }

    setSoftSkills() {
        for (let skill of this.softSkills) {
            // push skills to form-array
            this.pushSkillToFormArray(this.softSkillsForm, skill);
        }
    }

    // onSkillDelete(id: number, soft: boolean, index: number) {
    onSkillDelete(form: AbstractControl, index: number) {
        let id = form.get('id')?.value;
        let soft = form.get('softSkill')?.value;

        this.deleteEvent.emit(form.value);

        if (soft) {
            this.softSkillsForm.removeAt(index);
        } else {
            this.hardSkillsForm.removeAt(index);
        }
    }

    onSkillUpdate(form: AbstractControl) {
        this.updateEvent.emit(form.value);
        this.stopEditing.emit();
    }

    onSkillSave(form: AbstractControl) {
        this.saveEvent.emit(form.value);
        this.stopEditing.emit();
    }

    get hardSkillsForm() {
        return this.skillsForm.get('hardSkills') as FormArray;
    }
    get softSkillsForm() {
        return this.skillsForm.get('softSkills') as FormArray;
    }

    get newTitle() {
        return this.newSkillForm.get('title');
    }
    get newValue() {
        return this.newSkillForm.get('value');
    }

    getGroupTitle(group: AbstractControl) {
        return group.get('title');
    }
    getGroupValue(group: AbstractControl) {
        return group.get('value');
    }
}
