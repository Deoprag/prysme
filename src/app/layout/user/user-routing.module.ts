import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserComponent} from "./user.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'users', component: UserComponent},
    ])],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
