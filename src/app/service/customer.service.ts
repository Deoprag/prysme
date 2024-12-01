import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private baseUrl = 'http://localhost:8080/api/v1/customer';

    constructor(private http: HttpClient) {}

    findAll(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.baseUrl);
    }

    findById(id: number): Observable<Customer> {
        return this.http.get<Customer>(`${this.baseUrl}/${id}`);
    }

    findAllBySellerId(id: number): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.baseUrl}/findAllBySellerId/${id}`);
    }

    removeFromWallet(id: number): Observable<Customer> {
        return this.http.get<Customer>(`${this.baseUrl}/removeFromWallet/${id}`);
    }

    create(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(`${this.baseUrl}/create`, customer);
    }

    update(customer: Customer): Observable<Customer> {
        return this.http.put<Customer>(`${this.baseUrl}/save`, customer);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
