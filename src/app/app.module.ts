import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/default-menu/app.layout.module';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { ProductService } from './service/product.service';
import { CustomerService } from './service/customer.service';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CustomerService, ProductService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
