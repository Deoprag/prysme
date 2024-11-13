import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private baseUrl = 'http://localhost:8080/api/v1/task';

    constructor(private http: HttpClient) {}

    findAll(): Observable<Task[]> {
        return this.http.get<Task[]>(this.baseUrl);
    }

    findById(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.baseUrl}/${id}`);
    }

    findAllByUsername(username: string, date: Date): Observable<Task[]> {
        const stringDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-');
        return this.http.get<Task[]>(`${this.baseUrl}/findAllByUsername/${username}/${stringDate}`);
    }

    create(task: Task): Observable<Task> {
        return this.http.post<Task>(`${this.baseUrl}/create`, task);
    }

    update(task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.baseUrl}/save`, task);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
