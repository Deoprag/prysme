import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import {SalesFunnelComponent} from "./sales-funnel/sales-funnel.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'customer', component: CustomerComponent },
        { path: 'customer/salesFunnel', component: SalesFunnelComponent }
    ])],
    exports: [RouterModule]
})
export class CustomersRoutingModule { }
