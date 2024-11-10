import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {MessageService} from "primeng/api";

export const authGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isAuthenticated = authService.isAuthenticated();

    if (!isAuthenticated) {
        if (authService.getRefreshToken() && authService.getToken()) {
            authService.refreshToken().subscribe({
                next: (response: any) => {
                    localStorage.setItem('accessToken', response.token.accessToken);
                    localStorage.setItem('refreshToken', response.token.refreshToken);
                    localStorage.setItem('userId', response.userId);
                    router.navigate(['/']).catch((error: any) => {
                        window.alert(`Erro de navegação: Não foi possível redirecionar: ${error}`);
                    });
                },
                error: (error: any) => {
                    router.navigate(['auth/login']);
                    window.alert('Sua sessão expirou, faça login novamente!');
                }
            });
        } else {
            router.navigate(['auth/login']);
        }
        return false;
    }

    return true;
};
