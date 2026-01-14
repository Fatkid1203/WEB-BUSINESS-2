import { Component } from '@angular/core';

@Component({
  selector: 'app-learndirective',
  standalone: false,
  templateUrl: './learndirective.html',
  styleUrls: ['./learndirective.css'],
})
export class Learndirective {
  flag_value: number = 1;

  changeView() {
    this.flag_value = this.flag_value === 1 ? 2 : 1;
  }

  products = ["thuốc lá", "thuốc lào", "thuốc trị hôi nách"];

  products2 = [
    { id: 1, name: "thuốc lá" },
    { id: 2, name: "thuốc lào" },
    { id: 3, name: "thuốc trị hôi nách" }
  ];
}