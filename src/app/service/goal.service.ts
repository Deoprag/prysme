import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Goal} from "../model/goal";

@Injectable({
  providedIn: 'root'
})
export class GoalService {
    private baseUrl = 'http://localhost:8080/api/v1/goal';

    constructor(private http: HttpClient) {}

    findAll(): Observable<Goal[]> {
        return this.http.get<Goal[]>(this.baseUrl);
    }

    findById(id: number): Observable<Goal> {
        return this.http.get<Goal>(`${this.baseUrl}/${id}`);
    }

    create(goal: Goal): Observable<Goal> {
        return this.http.post<Goal>(`${this.baseUrl}/create`, goal);
    }

    update(goal: Goal): Observable<Goal> {
        return this.http.put<Goal>(`${this.baseUrl}/save`, goal);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    findCurrentGoalByUsername(username: string): Observable<Goal> {
        return this.http.get<Goal>(`${this.baseUrl}/findCurrentGoalByUsername/${username}`);
    }
}

