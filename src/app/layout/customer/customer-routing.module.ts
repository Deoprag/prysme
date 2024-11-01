import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CustomerComponent} from './customer.component';
import {WalletComponent} from "./wallet/wallet.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'customers', component: CustomerComponent},
        {path: 'customers/wallet', component: WalletComponent}
    ])],
    exports: [RouterModule]
})
export class CustomersRoutingModule {
}
