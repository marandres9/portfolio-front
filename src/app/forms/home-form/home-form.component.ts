import {
    Component,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    EventEmitter,
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Home } from 'src/app/model/Home';

@Component({
    selector: 'app-home-form',
    templateUrl: './home-form.component.html',
    styleUrls: ['./home-form.component.css'],
})
export class HomeFormComponent implements OnInit, OnChanges {
    @Input() title: string = '';
    @Input() description: string = '';

    @Input() editing: boolean = false;
    // emition of this event tells parent to stop editing
    @Output() stopEditing = new EventEmitter();

    @Output() updateEvent = new EventEmitter<Home>();

    homeForm = this.fb.group({
        id: '',
        title: ['', [Validators.required, Validators.maxLength(255)]],
        description: ['', Validators.required],
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        let title = changes['title'];
        let desc = changes['description'];

        if ((title && title.currentValue) || (desc && desc.currentValue)) {
            this.setHome();
        }

        let edit = changes['editing'];
        if (edit) {
            this.changeFormState();
        }
    }

    changeFormState() {
        this.editing ? this.homeForm.enable() : this.homeForm.disable();
    }

    setHome() {
        this.homeForm.setValue({
            id: 1,
            title: this.title,
            description: this.description,
        });
    }

    onHomeUpdate() {
        // En vez de recibir los parametros por separado recibe el FormGroup
        // la estructura del Form debe ser igual al modelo de Home porque se pasa
        // directamente como tal
        this.updateEvent.emit(this.homeForm.value);
        this.stopEditing.emit();
    }

    cancelChanges() {
        this.setHome();
        this.stopEditing.emit();
    }

    get homeTitle() {
        return this.homeForm.get('title');
    }
    get homeDescription() {
        return this.homeForm.get('description');
    }
}
