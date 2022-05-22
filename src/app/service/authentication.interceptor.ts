import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        let token = this.authService.token;

        if (token) {
            request = request.clone({
                headers: request.headers.set(
                    'Authorization',
                    `Bearer ${this.authService.token}`
                ),
            });
        }

        return next.handle(request);
    }
}
