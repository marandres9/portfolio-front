import { Component, Input, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { About } from 'src/app/model/About';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
    @Input() description: string;

    editing = false;

    constructor(
        private authService: AuthenticationService,
        private http: HttpService
    ) {}

    public isLoggedIn() {
        return this.authService.isLoggedIn;
    }

    ngOnInit(): void {}

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
                    } else {
                        alert('Error encountered');
                    }
                });
        };

        this.authService.performServerOperation(op);
    }
}
