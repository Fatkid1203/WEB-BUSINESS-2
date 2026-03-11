import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FashionService, Fashion } from '../services/fashion.service';

@Component({
  selector: 'app-fashion-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fashion-list.component.html',
  styleUrl: './fashion-list.component.css'
})
export class FashionListComponent implements OnInit {
  fashions: Fashion[] = [];
  errMessage: string = '';

  constructor(private fashionService: FashionService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadFashions();
  }

  loadFashions() {
    this.fashionService.getFashions().subscribe({
      next: (data) => {
        this.fashions = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err.message;
        this.cdr.detectChanges();
      }
    });
  }

  deleteFashion(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa fashion này?')) {
      this.fashionService.deleteFashion(id).subscribe({
        next: () => {
          this.loadFashions();
        },
        error: (err) => {
          this.errMessage = err.message;
          this.cdr.detectChanges();
        }
      });
    }
  }
}
