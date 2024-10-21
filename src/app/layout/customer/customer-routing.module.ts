import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'customer', component: CustomerComponent }
    ])],
    exports: [RouterModule]
})
export class CustomersRoutingModule { }
