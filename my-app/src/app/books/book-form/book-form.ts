import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { BookAPIService } from '../../myservices/book-apiservice';
import { IBook as Book } from '../../myclasses/iBook';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css'],
})
export class BookFormComponent implements OnInit {
  book: Partial<Book> = {
    Tensach: '',
    Giaban: 0,
    Mota: '',
    Anhbia: '',
    Soluongton: 0,
    MaCD: 0,
    MaNXB: 0,
  };
  isEdit = false;
  id: string | null = null;
  errMessage = '';
  selectedFile: File | null = null;
  previewUrl = '';

  constructor(
    private api: BookAPIService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = idParam;
      this.api.getBook(this.id).subscribe({
        next: (b) => {
          this.book = { ...b };
          if (b.Anhbia) this.previewUrl = this.api.getCoverUrl(b.Anhbia);
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errMessage = err?.message || 'Không tải được sách';
          this.cdr.detectChanges();
        }
      });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => (this.previewUrl = reader.result as string);
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.selectedFile = null;
    this.book.Anhbia = '';
    this.previewUrl = '';
  }

  save(): void {
    console.log('Save called');
    this.errMessage = '';
    if (this.selectedFile) {
      console.log('Uploading file...');
      this.api.uploadCover(this.selectedFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.Response) {
            console.log('Upload complete');
            this.book.Anhbia = this.selectedFile!.name;
            this.submit();
          }
        },
        error: (err) => {
          console.error('Upload error:', err);
          this.errMessage = err?.message || 'Lỗi tải ảnh';
        },
      });
    } else {
      this.submit();
    }
  }

  private submit(): void {
    console.log('Submitting book:', this.book);
    const payload: Book = {
      id: this.id || '',
      Tensach: this.book.Tensach!,
      Giaban: this.book.Giaban!,
      Mota: this.book.Mota!,
      Anhbia: this.book.Anhbia || '',
      Ngaycapnhat: this.book.Ngaycapnhat || new Date().toISOString().slice(0, 19).replace('T', ' '),
      Soluongton: this.book.Soluongton!,
      MaCD: this.book.MaCD!,
      MaNXB: this.book.MaNXB!,
    };
    if (this.isEdit && this.id != null) {
      this.api.putBook(payload).subscribe({
        next: (res) => {
          console.log('Update success', res);
          this.router.navigate(['/ex50']);
        },
        error: (err) => {
          console.error('Update error:', err);
          this.errMessage = err?.message || 'Lỗi cập nhật';
        },
      });
    } else {
      this.api.postBook(payload).subscribe({
        next: (res) => {
          console.log('Create success', res);
          this.router.navigate(['/ex50']);
        },
        error: (err) => {
          console.error('Create error:', err);
          this.errMessage = err?.message || 'Lỗi thêm sách';
        },
      });
    }
  }
}
