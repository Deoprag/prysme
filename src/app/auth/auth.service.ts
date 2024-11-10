import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../model/user";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly baseUrl = 'http://localhost:8080/api/v1/auth';

    constructor(private http: HttpClient) {}

    getToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    login(username: string, password: string): any {
        return this.http.post<any>(`${this.baseUrl}/signIn`, { username, password });
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

    getUsername() {
        const token = this.getToken();
        if (!token) {
            return null;
        }
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub;
    }

    refreshToken(): Observable<Object> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getRefreshToken()}`);
        return this.http.put(`${this.baseUrl}/refresh/${this.getUsername()}`, {}, { headers });
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
    }
}
