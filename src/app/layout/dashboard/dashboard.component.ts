import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {LayoutService} from 'src/app/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    items!: MenuItem[];
    products!: Product[];
    chartData: any;
    chartOptions: any;

    constructor(
        private productService: ProductService,
        public layoutService: LayoutService) {
    }

    ngOnInit() {

    }
}
