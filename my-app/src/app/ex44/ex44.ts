import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ex44',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ex44.html',
  styleUrls: ['./ex44.css']
})
export class Ex44Component {
  // Input fields mapping exactly to Ex44 screenshot
  book = {
    BookId: 'b1',
    BookName: 'Máy học cơ bản',
    Price: 200,
    Image: 'p3.png'
  };

  // List of books returned from server
  databaseResult: any[] = [];
  errorMessage = '';

  constructor(private http: HttpClient) { }

  updateBook() {
    this.errorMessage = '';
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');

    // Using current proxy to send an Ex44-formatted request payload
    this.http.put<any[]>('/books', this.book, { headers }).subscribe({
      next: (data) => {
        this.databaseResult = data;
        console.log('Update successful, returned database:', data);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Lỗi khi cập nhật sách';
        console.error('Update failed:', err);
      }
    });
  }
}
