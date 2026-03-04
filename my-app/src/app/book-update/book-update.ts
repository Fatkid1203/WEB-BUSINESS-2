import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookAPIService } from '../myservices/book-apiservice';
import { IBook } from '../myclasses/iBook';

@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-update.html',
  styleUrls: ['./book-update.css'],
})
export class BookUpdateComponent {
  // book = new Book() translated to this according to IBook interface payload needs for put
  book: any = {
    BookId: '',
    BookName: '',
    Price: 0,
    Image: ''
  };
  books: any;
  errMessage: string = '';

  constructor(private _service: BookAPIService, private cdr: ChangeDetectorRef) {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err.message || err;
        this.cdr.detectChanges();
      }
    });
  }

  putBook() {
    this._service.putBook(this.book).subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err.message || err;
        this.cdr.detectChanges();
      }
    });
  }
}
