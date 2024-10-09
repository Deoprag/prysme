import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../model/product-category';

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryService {
    private baseUrl = 'http://localhost:8080/api/v1/productCategory';

    constructor(private http: HttpClient) {}

    findAll(): Observable<ProductCategory[]> {
        return this.http.get<ProductCategory[]>(this.baseUrl);
    }

    findById(id: number): Observable<ProductCategory> {
        return this.http.get<ProductCategory>(`${this.baseUrl}/${id}`);
    }

    create(product: ProductCategory): Observable<ProductCategory> {
        return this.http.post<ProductCategory>(`${this.baseUrl}/create`, product);
    }

    update(product: ProductCategory): Observable<ProductCategory> {
        return this.http.put<ProductCategory>(`${this.baseUrl}/save`, product);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
