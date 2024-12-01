import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SalesOrderComponent} from "./sales-order.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'salesOrder', component: SalesOrderComponent},
    ])],
    exports: [RouterModule]
})
export class SalesOrderRoutingModule {
}
