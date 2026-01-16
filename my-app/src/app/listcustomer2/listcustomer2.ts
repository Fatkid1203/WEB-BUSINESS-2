import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customerservice } from '../customerservice';

@Component({
  selector: 'app-listcustomer2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listcustomer2.html',
  styleUrl: './listcustomer2.css',
})
export class Listcustomer2 {
  customers: any;
  allCustomers: any;
  ages: number[] = [];

  constructor(private cs: Customerservice) {
    this.allCustomers = cs.get_all_customers();
    this.customers = this.allCustomers;
    for (let i = 20; i <= 100; i++) {
      this.ages.push(i);
    }
  }

  filterByAgeRange(min: string, max: string) {
    let minAge = parseInt(min) || 0;
    let maxAge = parseInt(max) || 999;
    this.customers = this.allCustomers.filter((c: any) => {
      let age = parseInt(c.age);
      return age >= minAge && age <= maxAge;
    });
  }
}
