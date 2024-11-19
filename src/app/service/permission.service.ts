import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from '../model/permission';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    private baseUrl = 'http://localhost:8080/api/v1/permission';

    constructor(private http: HttpClient) {}

    findAll(): Observable<Permission[]> {
        return this.http.get<Permission[]>(this.baseUrl);
    }

    findById(id: number): Observable<Permission> {
        return this.http.get<Permission>(`${this.baseUrl}/${id}`);
    }

    create(nF: Permission): Observable<Permission> {
        return this.http.post<Permission>(`${this.baseUrl}/create`, nF);
    }

    update(nF: Permission): Observable<Permission> {
        return this.http.put<Permission>(`${this.baseUrl}/save`, nF);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
