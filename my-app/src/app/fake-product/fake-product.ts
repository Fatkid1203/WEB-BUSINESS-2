import { Component, ChangeDetectorRef } from '@angular/core';
import { FakeProductService } from '../myservices/fake-product-service';

@Component({
  selector: 'app-fake-product',
  standalone: false,
  templateUrl: './fake-product.html',
  styleUrl: './fake-product.css',
})
export class FakeProduct {
  data: any = [];
  errMessage: string = ''
  constructor(_service: FakeProductService, private cd: ChangeDetectorRef) {
    console.log('Fetching data...');
    console.log('FakeProduct: Fetching data...');
    _service.getFakeProductData().subscribe({
      next: (data) => {
        console.log('FakeProduct: Data received:', data);
        this.data = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('FakeProduct: Error:', err);
        this.errMessage = err;
      }
    });
  }
}
