import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../model/team';

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    private baseUrl = 'http://localhost:8080/api/v1/team';

    constructor(private http: HttpClient) {}

    findAll(): Observable<Team[]> {
        return this.http.get<Team[]>(this.baseUrl);
    }

    findById(id: number): Observable<Team> {
        return this.http.get<Team>(`${this.baseUrl}/${id}`);
    }

    create(team: Team): Observable<Team> {
        return this.http.post<Team>(`${this.baseUrl}/create`, team);
    }

    update(team: Team): Observable<Team> {
        return this.http.put<Team>(`${this.baseUrl}/save`, team);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
