import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../model/user";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly baseUrl = 'http://localhost:8080/api/v1/auth';
    public user: User = JSON.parse(localStorage.getItem('user'));

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

        if (isTokenExpired) this.logout();

        return !isTokenExpired;
    }

    refreshToken(): Observable<string> {
        return this.http.get(`${this.baseUrl}/refresh/${this.user.username}`, { responseType: 'text' });
    }

    logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }
}
