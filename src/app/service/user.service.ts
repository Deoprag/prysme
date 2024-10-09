import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../model/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:8080/api/v1/user';

    constructor(private http: HttpClient) {}

    findAll(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl);
    }

    findById(id: number): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${id}`);
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}/create`, user);
    }

    update(user: User): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/save`, user);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
