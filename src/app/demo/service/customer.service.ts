import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../api/customer';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomers() {
        return this.http.get<any>('http://localhost:8080/api/v1/customer')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }
}
