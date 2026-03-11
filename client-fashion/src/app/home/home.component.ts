import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FashionService, Fashion } from '../services/fashion.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  allFashions: Fashion[] = [];
  groupedFashions: { style: string, fashions: Fashion[] }[] = [];
  styles: string[] = [];
  searchStyle: string = '';
  errMessage: string = '';

  constructor(private fashionService: FashionService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadFashions();
    this.loadStyles();
  }

  loadFashions() {
    this.fashionService.getFashions().subscribe({
      next: (data) => {
        this.allFashions = data;
        this.groupByStyle(data);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err.message;
        this.cdr.detectChanges();
      }
    });
  }

  loadStyles() {
    this.fashionService.getStyles().subscribe({
      next: (data) => {
        this.styles = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err.message;
        this.cdr.detectChanges();
      }
    });
  }

  groupByStyle(fashions: Fashion[]) {
    const groups: { [key: string]: Fashion[] } = {};
    fashions.forEach(f => {
      if (!groups[f.style]) {
        groups[f.style] = [];
      }
      groups[f.style].push(f);
    });
    this.groupedFashions = Object.keys(groups).map(style => ({
      style: style,
      fashions: groups[style]
    }));
  }

  onSearch() {
    if (!this.searchStyle || this.searchStyle === '') {
      this.groupByStyle(this.allFashions);
      this.cdr.detectChanges();
    } else {
      this.fashionService.getFashionsByStyle(this.searchStyle).subscribe({
        next: (data) => {
          this.groupByStyle(data);
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errMessage = err.message;
          this.cdr.detectChanges();
        }
      });
    }
  }
}
