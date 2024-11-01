import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {NotfoundComponent} from './layout/notfound/notfound.component';
import {AppLayoutComponent} from "./layout/default-menu/app.layout.component";
import {authGuard} from './guards/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent, canActivate: [authGuard],
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./layout/dashboard/dashboard.module').then(m => m.DashboardModule)
                    },
                    {
                        path: '',
                        loadChildren: () => import('./layout/customer/customer-routing.module').then(m => m.CustomersRoutingModule)
                    },
                    {
                        path: '',
                        loadChildren: () => import('./layout/product/product-routing.module').then(m => m.ProductsRoutingModule)
                    },
                ]
            },
            {path: 'auth', loadChildren: () => import('./layout/auth/auth.module').then(m => m.AuthModule)},
            {path: 'landing', loadChildren: () => import('./layout/landing/landing.module').then(m => m.LandingModule)},
            {path: 'notfound', component: NotfoundComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
