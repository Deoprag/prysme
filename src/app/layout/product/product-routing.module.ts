import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductComponent} from "./product.component";
import {ProductCategoryComponent} from "./product-category/product-category.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'products', component: ProductComponent},
        {path: 'products/categories', component: ProductCategoryComponent}
    ])],
    exports: [RouterModule]
})
export class ProductsRoutingModule {
}
