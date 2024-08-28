import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    getProducts() {
        return this.http.get<any>('http://localhost:8080/api/v1/products')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
}
