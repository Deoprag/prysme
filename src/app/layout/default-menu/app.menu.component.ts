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
        const userRoles = this.authService.getRoles();

        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Inicio',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/home'],
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
                label: 'Administração',
                items: [
                    {
                        label: 'Usuários',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/users'],
                        role: ''
                    },
                ],
                role: 'ADMIN'
            },
            {
                label: 'Equipe',
                items: [
                    {
                        label: 'Metas',
                        icon: 'pi pi-fw pi-chart-line',
                        routerLink: ['/goals'],
                        role: ''
                    },
                    {
                        label: 'Vendedores',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/seller'],

                        role: ''
                    },
                    {
                        label: 'Pedidos de Venda',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/salesOrder'],
                        role: ''
                    },
                ],
                role: 'MANAGER'
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
                        role: 'SELLER'
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

        this.model = this.model.filter(menu => {
            if (menu.role && !userRoles.includes(menu.role)) {
                return false;
            }

            menu.items = menu.items.filter(item => {
                if (!item.role) return true;
                return userRoles.some(role => role === item.role);
            });

            return menu.items.length > 0;
        });
    }

}
