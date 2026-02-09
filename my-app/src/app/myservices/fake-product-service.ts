import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { IFakeProduct } from '../myclasses/iProduct';

@Injectable({
  providedIn: 'root',
})
export class FakeProductService {
  private _url: string = "https://fakestoreapi.com/products"
  constructor(private _http: HttpClient) { }
  getFakeProductData(): Observable<any> {
    return this._http.get<any>(this._url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}
