import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private baseUrl = 'http://localhost:8080/api/v1/contact';

    constructor(private http: HttpClient) {}

    findAll(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.baseUrl);
    }

    findById(id: number): Observable<Contact> {
        return this.http.get<Contact>(`${this.baseUrl}/${id}`);
    }

    create(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(`${this.baseUrl}/create`, contact);
    }

    update(contact: Contact): Observable<Contact> {
        return this.http.put<Contact>(`${this.baseUrl}/save`, contact);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
