import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BitcoinService } from '../myservices/bitcoin.service';

@Component({
    selector: 'app-ex28',
    standalone: false,
    templateUrl: './ex28.html',
    styleUrl: './ex28.css',
})
export class Ex28 implements OnInit {
    bitcoinData: any;
    errMessage: string = '';

    constructor(private _service: BitcoinService, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this._service.getBitcoinPrice().subscribe({
            next: (data) => {
                // API returns an array, find Bitcoin
                if (Array.isArray(data)) {
                    this.bitcoinData = data.find((item: any) => item.id === 'bitcoin');
                } else {
                    this.bitcoinData = data; // Fallback if data is not array
                }
                this.cdr.detectChanges(); // Force view update
            },
            error: (err) => {
                this.errMessage = err.message;
                this.cdr.detectChanges();
            }
        });
    }
}
