import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from '../../service/app.layout.service';
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard'],
                        role: ''
                    },
                    {
                        label: 'Metas',
                        icon: 'pi pi-fw pi-chart-line',
                        routerLink: ['/goals'],
                        role: ''
                    },
                    {
                        label: 'Tarefas',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/tasks'],
                        role: ''
                    },
                ],
            },
            {
                label: 'Equipe',
                items: [
                    {
                        label: 'Usuários',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/users'],
                        role: ''
                    },
                ]
            },
            {
                label: 'Clientes',
                items: [
                    {
                        label: 'Lista',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/customers'],
                        role: ''
                    },
                    {
                        label: 'Carteira',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: ['/customers/wallet'],
                        role: ''
                    },
                ]
            },
            {
                label: 'Produtos',
                items: [
                    {
                        label: 'Lista',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/products'],
                        role: ''
                    },
                    {
                        label: 'Categorias',
                        icon: 'pi pi-fw pi-tags',
                        routerLink: ['/products/categories'],
                        role: ''
                    },
                ]
            },
        ];
    }
}
