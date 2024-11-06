import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest = request;
        const finalToken = this.authService.getToken();

        if (finalToken) {
            authRequest = request.clone({
                setHeaders: { Authorization: `Bearer ${finalToken}` },
            });
        }

        return next.handle(authRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && finalToken) {
                    return this.authService.refreshToken().pipe(
                        switchMap((newToken: string) => {
                            localStorage.setItem('token', newToken);
                            const newRequest = request.clone({
                                setHeaders: { Authorization: `Bearer ${newToken}` },
                            });
                            return next.handle(newRequest);
                        }),
                        catchError(() => {
                            this.authService.logout();
                            this.router.navigate(['/auth/login']);
                            return throwError(() => new Error('Sessão expirada. Faça login novamente.'));
                        })
                    );
                }
                return throwError(() => new Error(error.message));
            })
        );
    }
}
