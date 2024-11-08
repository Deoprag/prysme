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
import {MessageService} from "primeng/api";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest = request;
        const finalToken = this.authService.getToken();

        if (finalToken && this.authService.isAuthenticated()) {
            authRequest = request.clone({
                setHeaders: { Authorization: `Bearer ${finalToken}` },
            });
        }

        return next.handle(authRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && finalToken) {
                    return this.authService.refreshToken().pipe(
                        switchMap((newToken: string) => {
                            localStorage.setItem('accessToken', newToken);
                            const newRequest = request.clone({
                                setHeaders: { Authorization: `Bearer ${newToken}` },
                            });
                            return next.handle(newRequest);
                        }),
                        catchError((error: any) => {
                            this.authService.logout();
                            this.router.navigate(['/auth/login']).catch(() => {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Erro de navegação',
                                    detail: `Não foi possível redirecionar para a tela de login: ${error}`,
                                });
                            });
                            return throwError(() => error);
                        })
                    );
                }
                return throwError(() => error);
            })
        );
    }

}
