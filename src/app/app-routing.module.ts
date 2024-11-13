import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {NotfoundComponent} from './layout/notfound/notfound.component';
import {AppLayoutComponent} from "./layout/default-menu/app.layout.component";
import {authGuard} from './auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent, canActivate: [authGuard],
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./layout/dashboard/dashboard.module').then(m => m.DashboardModule),
                        canActivate: [authGuard]
                    },
                    {
                        path: '',
                        loadChildren: () => import('./layout/customer/customer-routing.module').then(m => m.CustomersRoutingModule),
                        canActivate: [authGuard]
                    },
                    {
                        path: '',
                        loadChildren: () => import('./layout/product/product-routing.module').then(m => m.ProductsRoutingModule),
                        canActivate: [authGuard]
                    },
                    {
                        path: '',
                        loadChildren: () => import('./layout/user/user-routing.module').then(m => m.UsersRoutingModule),
                        canActivate: [authGuard]
                    },
                    {
                        path: '',
                        loadChildren: () => import('./layout/task/task-routing.module').then(m => m.TasksRoutingModule),
                        canActivate: [authGuard]
                    },
                    {
                        path: '',
                        loadChildren: () => import('./layout/goal/goal-routing.module').then(m => m.GoalsRoutingModule),
                        canActivate: [authGuard]
                    },
                ]
            },
            {path: 'auth', loadChildren: () => import('./layout/auth/auth.module').then(m => m.AuthModule)},
            {path: 'landing', loadChildren: () => import('./layout/landing/landing.module').then(m => m.LandingModule)},
            {path: 'notfound', component: NotfoundComponent},
            {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
