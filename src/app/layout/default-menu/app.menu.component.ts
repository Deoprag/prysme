import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
                    { label: 'Metas', icon: 'pi pi-fw pi-chart-line\n', routerLink: ['/goal'] },
                ]
            },
            {
                label: 'Clientes',
                items: [
                    { label: 'Lista', icon: 'pi pi-fw pi-users', routerLink: ['/customers'] },
                    { label: 'Carteira', icon: 'pi pi-fw pi-wallet', routerLink: ['/customers/wallet'] },
                ]
            },
            {
                label: 'Produtos',
                items: [
                    { label: 'Lista', icon: 'pi pi-fw pi-box', routerLink: ['/products'] },
                    { label: 'Categorias', icon: 'pi pi-fw pi-tags', routerLink: ['/products/categories'] },
                ]
            },
            {
                label: 'Utilities',
                items: [
                    { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    { label: 'Landing', icon: 'pi pi-fw pi-globe', routerLink: ['/landing'] },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                ]
            },
        ];
    }
}
