import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SellerComponent} from "./seller.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'seller', component: SellerComponent},
    ])],
    exports: [RouterModule]
})
export class SellerRoutingModule {
}
