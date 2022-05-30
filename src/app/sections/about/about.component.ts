import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { catchError, of } from 'rxjs';
import { About } from 'src/app/model/About';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnChanges {
    @Input() description: string;

    paragraphs: string[];

    editing = false;

    constructor(
        private authService: AuthenticationService,
        private http: HttpService
    ) {}

    public isLoggedIn() {
        return this.authService.isLoggedIn;
    }

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        let desc = changes['description'];
        if (desc && desc.currentValue) {
            this.paragraphs = this.description.split('\n\n');
        }
    }

    toggleEditing() {
        this.editing = !this.editing;
    }

    updateAbout(about: About) {
        const op = () => {
            this.http
                .updateAbout(about)
                .pipe(catchError((err) => of(null)))
                .subscribe((about) => {
                    if (about) {
                        this.description = about.description;
                        window.location.reload()
                    } else {
                        alert('Error encountered');
                    }
                });
        };

        this.authService.performServerOperation(op);
    }
}
