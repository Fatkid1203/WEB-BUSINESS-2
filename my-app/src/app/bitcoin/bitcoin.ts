import { Component } from '@angular/core';
import { BitcoinService } from '../myservices/bitcoin.service';

@Component({
  selector: 'app-bitcoin',
  standalone: false,
  templateUrl: './bitcoin.html',
  styleUrl: './bitcoin.css',
})
export class BitcoinComponent {
  bitcoinData: any;
  errMessage: string = '';

  constructor(private _service: BitcoinService) {
    this._service.getBitcoinPrice().subscribe({
      next: (data) => {
        this.bitcoinData = data;
      },
      error: (err) => {
        this.errMessage = err.message;
      }
    });
  }
}
