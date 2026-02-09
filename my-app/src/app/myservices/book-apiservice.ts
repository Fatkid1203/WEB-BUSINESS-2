import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { IBook } from '../myclasses/iBook';

@Injectable({
  providedIn: 'root',
})
export class BookAPIService {
  constructor(private _http: HttpClient) { }

  getBooks(): Observable<IBook[]> {
    return this._http.get<IBook[]>("/books").pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getBook(id: string): Observable<IBook> {
    return this._http.get<IBook>(`/books/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  postBook(book: IBook): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this._http.post<IBook>("/books", book, { headers: headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  putBook(book: IBook): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this._http.put<IBook>("/books", book, { headers: headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  deleteBook(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this._http.delete<any>(`/books/${id}`, { headers: headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  uploadCover(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("image", file);
    return this._http.post("/upload", formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }

  getCoverUrl(filename: string): string {
    if (filename && filename.startsWith('p')) {
      return "/images/" + filename;
    }
    return "/image/" + filename;
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}
