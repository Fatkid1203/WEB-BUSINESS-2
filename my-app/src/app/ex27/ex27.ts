import { Component, ChangeDetectorRef } from '@angular/core';
import { FakeProductService } from '../myservices/fake-product-service';

@Component({
    selector: 'app-ex27',
    standalone: false,
    templateUrl: './ex27.html',
    styleUrl: './ex27.css',
})
export class Ex27 {
    data: any = [];
    errMessage: string = '';
    constructor(private _service: FakeProductService, private cd: ChangeDetectorRef) {
        this._service.getFakeProductData().subscribe({
            next: (data) => {
                this.data = data;
                this.cd.detectChanges();
            },
            error: (err) => {
                this.errMessage = err;
            }
        });
    }
}
