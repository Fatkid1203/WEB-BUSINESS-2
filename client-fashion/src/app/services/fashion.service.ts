import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Fashion {
  _id?: string;
  title: string;
  details: string;
  thumbnail: string;
  style: string;
  createdDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FashionService {
  private apiUrl = 'http://localhost:4000/fashions';

  constructor(private http: HttpClient) {}

  getFashions(): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(this.apiUrl).pipe(retry(3), catchError(this.handleError));
  }

  getFashion(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.apiUrl}/${id}`).pipe(retry(3), catchError(this.handleError));
  }

  getFashionsByStyle(style: string): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(`${this.apiUrl}/style/${encodeURIComponent(style)}`).pipe(retry(3), catchError(this.handleError));
  }

  getStyles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/styles/all`).pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
