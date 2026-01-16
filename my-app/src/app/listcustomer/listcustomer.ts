import { Component } from '@angular/core';

@Component({
  selector: 'app-listcustomer',
  standalone: false,
  templateUrl: './listcustomer.html',
  styleUrl: './listcustomer.css',
})
export class Listcustomer {
  customers = [
    { "id": "c1", "name": "Putin", "age": "72", "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSztcXxnCD-2i4sbBTMX-s5KsmGdgcap3EUBA&s" },
    { "id": "c2", "name": "Trump", "age": "78", "picture": "trump.png" },
    { "id": "c3", "name": "Kim", "age": "40", "picture": "kim.png" },
    { "id": "c4", "name": "Tap", "age": "82", "picture": "tap.png" },
  ]
}
