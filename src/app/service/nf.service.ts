import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NF } from '../model/nf';

@Injectable({
    providedIn: 'root'
})
export class NFService {
    private baseUrl = 'http://localhost:8080/api/v1/nF';

    constructor(private http: HttpClient) {}

    findAll(): Observable<NF[]> {
        return this.http.get<NF[]>(this.baseUrl);
    }

    findById(id: number): Observable<NF> {
        return this.http.get<NF>(`${this.baseUrl}/${id}`);
    }

    create(nF: NF): Observable<NF> {
        return this.http.post<NF>(`${this.baseUrl}/create`, nF);
    }

    update(nF: NF): Observable<NF> {
        return this.http.put<NF>(`${this.baseUrl}/save`, nF);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
