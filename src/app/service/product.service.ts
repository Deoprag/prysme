import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private baseUrl = 'http://localhost:8080/api/v1/product';

    constructor(private http: HttpClient) {}

    findAll(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl);
    }

    findById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/${id}`);
    }

    create(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.baseUrl}/create`, product);
    }

    update(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.baseUrl}/save`, product);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
