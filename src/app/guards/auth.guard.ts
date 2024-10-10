import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";

export const authGuard = async () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return true;

    // if (authService.isAuthenticated()) {
    //     return true;
    // } else {
    //     await router.navigate(['/auth/login']);
    //     return false;
    // }
};
