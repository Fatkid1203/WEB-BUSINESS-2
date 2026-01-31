import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BitcoinService {
    constructor(private http: HttpClient) { }

    getBitcoinPrice(): Observable<any> {
        return this.http.get<any>('/v1/ticker/');
    }
}
