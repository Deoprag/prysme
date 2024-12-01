import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quotation } from '../model/quotation';

@Injectable({
    providedIn: 'root'
})
export class QuotationService {
    private baseUrl = 'http://localhost:8080/api/v1/quotation';

    constructor(private http: HttpClient) {}

    findAll(): Observable<Quotation[]> {
        return this.http.get<Quotation[]>(this.baseUrl);
    }

    findAllByCustomerId(id: number): Observable<Quotation> {
        return this.http.get<Quotation>(`${this.baseUrl}/findAllByCustomerId/${id}`);
    }

    findById(id: number): Observable<Quotation> {
        return this.http.get<Quotation>(`${this.baseUrl}/${id}`);
    }

    create(quotation: Quotation): Observable<Quotation> {
        return this.http.post<Quotation>(`${this.baseUrl}/create`, quotation);
    }

    update(quotation: Quotation): Observable<Quotation> {
        return this.http.put<Quotation>(`${this.baseUrl}/save`, quotation);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
