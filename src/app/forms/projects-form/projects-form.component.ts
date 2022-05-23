import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/model/Project';

@Component({
    selector: 'app-projects-form',
    templateUrl: './projects-form.component.html',
    styleUrls: ['./projects-form.component.css'],
})
export class ProjectsFormComponent implements OnInit, OnChanges {
    @Input() projects: Project[];

    @Input() editing: boolean = false;
    // emition of this event tells parent to stop editing
    @Output() stopEditing = new EventEmitter();

    @Output() deleteEvent = new EventEmitter<Project>();
    @Output() updateEvent = new EventEmitter<Project>();
    @Output() saveEvent = new EventEmitter<Project>();

    projectsForm = this.fb.group({
        projects: this.fb.array([]),
    });

    newProjectForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(255)]],
        description: ['', [Validators.required, Validators.maxLength(255)]],
        url: ['', [Validators.required, Validators.maxLength(255)]],
    });
    showNewForm = false;
    toggleNewForm() {
        this.showNewForm = !this.showNewForm;
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        let proj = changes['projects'];
        if (proj && proj.currentValue) {
            this.setProjects();
        }

        if (changes['editing']) {
            this.changeFormState();
        }
    }

    changeFormState() {
        this.editing ? this.projectsForm.enable() : this.projectsForm.disable();
    }

    setProjects() {
        for (let proj of this.projects) {
            this.projectFormArray.push(
                this.fb.group({
                    id: proj.id,
                    title: [proj.title, [Validators.required, Validators.maxLength(255)]],
                    description: [proj.description, [Validators.required, Validators.maxLength(255)]],
                    url: [proj.url, [Validators.required, Validators.maxLength(255)]],
                })
            );
        }
        this.projectsForm.disable();
    }

    onProjectDelete(form: AbstractControl, index: number) {
        this.deleteEvent.emit(form.value);
        this.projectFormArray.removeAt(index);
    }

    onProjectUpdate(form: AbstractControl) {
        this.updateEvent.emit(form.value);
        this.stopEditing.emit();
    }

    onProjectSave(form: AbstractControl) {
        this.saveEvent.emit(form.value);
        this.stopEditing.emit();
    }

    get projectFormArray() {
        return this.projectsForm.get('projects') as FormArray;
    }

    getGroupTitle(group: AbstractControl) {
        return group.get('title');
    }
    getGroupDescription(group: AbstractControl) {
        return group.get('description')
    }
    getGroupUrl(group: AbstractControl) {
        return group.get('url')
    }

    get newTitle() {
        return this.newProjectForm.get('title');
    }
    get newDescription() {
        return this.newProjectForm.get('description')
    }
    get newUrl() {
        return this.newProjectForm.get('url')
    }
}
