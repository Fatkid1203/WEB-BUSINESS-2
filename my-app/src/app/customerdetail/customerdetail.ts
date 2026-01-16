import { Component } from '@angular/core';
import { Customerservice } from '../customerservice';

@Component({
  selector: 'app-customerdetail',
  standalone: false,
  templateUrl: './customerdetail.html',
  styleUrl: './customerdetail.css',
})
export class Customerdetail {
  constructor(private cs: Customerservice) { }

  search_customer_by_id(id: string, tdid: HTMLElement, tdname: HTMLElement, tdage: HTMLElement, tdpicture: HTMLImageElement) {
    let customer = this.cs.get_customer_detail(id);
    if (customer) {
      tdid.innerText = customer.id;
      tdname.innerText = customer.name;
      tdage.innerText = customer.age;
      tdpicture.src = customer.picture;
    } else {
      tdid.innerText = 'Not found';
      tdname.innerText = '';
      tdage.innerText = '';
      tdpicture.src = '';
    }
  }
}
