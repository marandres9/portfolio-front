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
        title: [''],
        value: [''],
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
        if (hardSkills && hardSkills.currentValue && softSkills && softSkills.currentValue) {
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
                title: [skill.title],
                value: [skill.value],
                softSkill: [skill.softSkill],
            })
        );
    }

    setSkills() {
        this.setHardSkills()
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
        this.stopEditing.emit()
    }

    get hardSkillsForm() {
        return this.skillsForm.get('hardSkills') as FormArray;
    }
    get softSkillsForm() {
        return this.skillsForm.get('softSkills') as FormArray;
    }
    // onSkillsDelete(form: AbstractControl, index: number) {
    //     let id = form.get('id')?.value;
    //     let isSoftSkill = form.get('softSkill')?.value;

    //     if (isSoftSkill) {
    //         this.softSkillsForm.removeAt(index);
    //     } else {
    //         this.hardSkillsForm.removeAt(index);
    //     }
    //     // An HttpClient method does not begin its HTTP request until you call
    //     // .subscribe() on the observable returned by that method
    //     this.http.deleteSkill(id).subscribe();
    // }

    // onSkillsUpdate(control: AbstractControl, index: number) {
    //     let id: number = control.get('id')?.value;
    //     let title: string = control.get('title')?.value;
    //     let value: number = control.get('value')?.value;

    //     this.http.updateSkill(id, title, value).subscribe();
    // }

    // onSkillsSave() {
    //     let form = this.addSkillForm;

    //     let title: string = form.get('title')?.value;
    //     let value: number = form.get('value')?.value;
    //     let softSkill: boolean = form.get('softSkill')?.value;

    //     let skill = new Skill(title, value, softSkill);
    //     // console.log(skill)
    //     this.http.saveSkill(skill).subscribe((newSkill) => {
    //         if (newSkill.softSkill) {
    //             this.pushSkillToFormArray(this.softSkillsForm, newSkill);
    //         } else {
    //             this.pushSkillToFormArray(this.hardSkillsForm, newSkill);
    //         }
    //     });
    //     this.addSkillForm.reset();
    //     this.showAddSkillForm = !this.showAddSkillForm;
    // }
}
