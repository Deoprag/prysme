import { Component, ElementRef, ViewChild } from '@angular/core';
import {ConfirmationService, MenuItem} from 'primeng/api';
import { LayoutService } from "../../service/app.layout.service";
import {AuthService} from "../../auth/auth.service";
import {OrderStatus} from "../../model/order-status";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [ConfirmationService]
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        public authService: AuthService,
        public confirmationService: ConfirmationService,
    ) {}

    logoff() {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja sair?',
            header: 'Confirmação',
            rejectLabel: 'Não', rejectButtonStyleClass: 'p-button-danger',
            acceptLabel: 'Sim', acceptButtonStyleClass: 'p-button-secondary',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.authService.logout();
            },
            reject: () => {
            }
        });
    }
}
