import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-listproduct',
  standalone: false,
  templateUrl: './listproduct.html',
  styleUrl: './listproduct.css',
})
export class Listproduct {
  products = [
    { "id": "P1", "name": "COCA", "price": 100000, "image": "https://cdn.tgdd.vn/Products/Images/2443/76451/bhx/nuoc-ngot-coca-cola-lon-320ml-202304131107525481.jpg" },
    { "id": "P2", "name": "PERSI", "price": 12000, "image": "https://cdn.tgdd.vn/Products/Images/2443/76467/bhx/nuoc-ngot-pepsi-cola-lon-320ml-202407131656260952.jpg" },
    { "id": "P3", "name": "STING", "price": 150000, "image": "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3226/76519/bhx/nuoc-tang-luc-sting-dau-sleek-lon-330ml_202509291421449068.jpg" },
    { "id": "P4", "name": "AQUA", "price": -10000, "image": "https://product.hstatic.net/1000301274/product/_10100995__nuoc_suoi_aquafina_500ml_chai_23249e397601447daa01bfa350fa66c1_1024x1024.png" },
    { "id": "P5", "name": "LAVIE", "price": -9000, "image": "https://lavieviva.vn/wp-content/uploads/2020/08/nuoc-lavie-PRESTIGE-700ml.png" },
  ]
  id_selected: any;
  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(params => {
      this.id_selected = params.get('id');
    });
  }
  view_detail(pid: string) {
    // alert("view detail of product " + pid);
    this.router.navigate(["san-pham-1", pid]);
  }
}

