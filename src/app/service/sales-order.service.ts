import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesOrder } from '../model/sales-order';

@Injectable({
    providedIn: 'root'
})
export class SalesOrderService {
    private baseUrl = 'http://localhost:8080/api/v1/salesOrder';

    constructor(private http: HttpClient) {}

    findAll(): Observable<SalesOrder[]> {
        return this.http.get<SalesOrder[]>(this.baseUrl);
    }

    findById(id: number): Observable<SalesOrder> {
        return this.http.get<SalesOrder>(`${this.baseUrl}/${id}`);
    }

    create(salesOrder: SalesOrder): Observable<SalesOrder> {
        return this.http.post<SalesOrder>(`${this.baseUrl}/create`, salesOrder);
    }

    update(salesOrder: SalesOrder): Observable<SalesOrder> {
        return this.http.put<SalesOrder>(`${this.baseUrl}/save`, salesOrder);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
