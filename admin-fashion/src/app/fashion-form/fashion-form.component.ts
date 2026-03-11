import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { FashionService, Fashion } from '../services/fashion.service';

@Component({
  selector: 'app-fashion-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, QuillEditorComponent],
  templateUrl: './fashion-form.component.html',
  styleUrl: './fashion-form.component.css'
})
export class FashionFormComponent implements OnInit {
  fashion: Fashion = {
    title: '',
    details: '',
    thumbnail: '',
    style: ''
  };
  isEditMode = false;
  fashionId: string = '';
  errMessage: string = '';

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

  constructor(
    private fashionService: FashionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.fashionId = id;
      this.fashionService.getFashion(id).subscribe({
        next: (data) => {
          this.fashion = data;
        },
        error: (err) => {
          this.errMessage = err.message;
        }
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.fashionService.updateFashion(this.fashionId, this.fashion).subscribe({
        next: () => {
          this.router.navigate(['/fashions']);
        },
        error: (err) => {
          this.errMessage = err.message;
        }
      });
    } else {
      this.fashionService.addFashion(this.fashion).subscribe({
        next: () => {
          this.router.navigate(['/fashions']);
        },
        error: (err) => {
          this.errMessage = err.message;
        }
      });
    }
  }
}
