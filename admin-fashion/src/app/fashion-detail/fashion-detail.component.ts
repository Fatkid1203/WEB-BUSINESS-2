import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FashionService, Fashion } from '../services/fashion.service';

@Component({
  selector: 'app-fashion-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fashion-detail.component.html',
  styleUrl: './fashion-detail.component.css'
})
export class FashionDetailComponent implements OnInit {
  fashion: Fashion | null = null;
  errMessage: string = '';

  constructor(
    private fashionService: FashionService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fashionService.getFashion(id).subscribe({
        next: (data) => {
          this.fashion = data;
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
