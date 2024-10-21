import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostalCodeService {
    private viaCepUrl = 'https://viacep.com.br/ws/';

    constructor(private http: HttpClient) { }

    getPostalCodeInfo(cep: string): Observable<any> {
        return this.http.get<any>(`${this.viaCepUrl}${cep}/json/`);
    }
}
