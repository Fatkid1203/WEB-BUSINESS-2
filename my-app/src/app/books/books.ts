import { Component, ChangeDetectorRef } from '@angular/core';
import { BookAPIService } from '../myservices/book-apiservice';
import { IBook } from '../myclasses/iBook';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  books: IBook[] = [];
  errMessage: string = ''
  constructor(private _service: BookAPIService, private cdr: ChangeDetectorRef) {
    this.loadBooks();
  }

  loadBooks() {
    this._service.getBooks().subscribe({
      next: (data) => {
        console.log("Books loaded:", data);
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error loading books:", err);
        this.errMessage = err;
      }
    });
  }

  deleteBook(id: string) {
    if (confirm("Are you sure you want to delete this book?")) {
      this._service.deleteBook(id).subscribe({
        next: () => { this.loadBooks() },
        error: (err) => { this.errMessage = err }
      })
    }
  }
}
