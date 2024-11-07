import { Component } from '@angular/core';
import { LayoutService } from 'src/app/service/app.layout.service';
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    spinner: boolean = false;
    username: string = '';
    password: string = '';

    constructor(
        public messageService: MessageService,
        public layoutService: LayoutService,
        public authService: AuthService,
        private router: Router
    ) {}

    login() {
        this.spinner = true;
        this.authService.login(this.username, this.password).subscribe({
            next: (response: any) => {
                this.spinner = false;
                this.authService.user = response.user;
                localStorage.setItem('accessToken', response.token.accessToken);
                localStorage.setItem('refreshToken', response.token.refreshToken);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Login',
                    detail: 'Logado com sucesso!'
                })
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.spinner = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: err,
                })
            }
        });
    }
}
