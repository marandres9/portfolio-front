import {
    Component,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    EventEmitter
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Home } from 'src/app/model/Home';

@Component({
    selector: 'app-home-form',
    templateUrl: './home-form.component.html',
    styleUrls: ['./home-form.component.css'],
})
export class HomeFormComponent implements OnInit, OnChanges {
    @Input() title: string;
    @Input() description: string;

    @Output() updateEvent = new EventEmitter<Home>()

    homeForm = this.fb.group({
        title: [''],
        description: [''],
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        let title = changes['title'].currentValue;
        let desc = changes['description'].currentValue;

        if (title != null && desc != null) {
            this.setHome();
        }
    }

    setHome() {
        this.homeForm.setValue({
            title: this.title,
            description: this.description,
        });
    }

    onHomeUpdate(title: string, desc: string) {
        this.updateEvent.emit(new Home(title, desc))
    }
}
