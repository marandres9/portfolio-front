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
import { Project } from 'src/app/model/Project';

@Component({
    selector: 'app-projects-form',
    templateUrl: './projects-form.component.html',
    styleUrls: ['./projects-form.component.css'],
})
export class ProjectsFormComponent implements OnInit, OnChanges {
    @Input() projects: Project[];

    @Output() deleteEvent = new EventEmitter<number>();
    @Output() updateEvent = new EventEmitter<Project>();
    @Output() saveEvent = new EventEmitter<Project>();

    projectsForm = this.fb.group({
        projects: this.fb.array([]),
    });

    newProjectForm = this.fb.group({
        title: [''],
        description: [''],
        url: [''],
    });
    showNewForm = false;
    toggleNewForm() {
        this.showNewForm = !this.showNewForm;
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        let proj = changes['projects'].currentValue;
        if (proj != null) {
            this.setProjects();
        }
    }

    setProjects() {
        for (let proj of this.projects) {
            this.projectFormArray.push(
                this.fb.group({
                    id: [proj.id],
                    title: [proj.title],
                    description: [proj.description],
                    url: [proj.url],
                })
            );
        }
    }

    onProjectDelete(id: number, index: number) {
        this.deleteEvent.emit(id)
        this.projectFormArray.removeAt(index)
    }

    onProjectUpdate(
        id: number,
        title: string,
        description: string,
        url: string
    ) {
        this.updateEvent.emit(new Project(id, title, description, url));
    }

    onProjectSave(title: string, description: string, url: string) {
        this.saveEvent.emit(new Project(0, title, description, url));
    }

    get projectFormArray() {
        return this.projectsForm.get('projects') as FormArray;
    }
}
