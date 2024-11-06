import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly baseUrl = 'http://localhost:8080/api/v1/auth';

    constructor(private http: HttpClient) {}

    getToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    login(username: string, password: string): Observable<string> {
        return this.http.post<string>(`${this.baseUrl}/signIn`, { username, password });
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isTokenExpired = payload.exp < Date.now() / 1000;
        return !isTokenExpired;
    }

    refreshToken(): Observable<string> {
        const username = localStorage.getItem('username');
        return this.http.get(`${this.baseUrl}/refresh/${username}`, { responseType: 'text' });
    }

    logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
    }
}
