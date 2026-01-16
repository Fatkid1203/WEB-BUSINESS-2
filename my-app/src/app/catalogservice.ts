import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CatalogService {
    datas = [
        {
            "Cateid": "cate1", "CateName": "nuoc ngot",
            "Products": [
                { "ProductId": "p1", "ProductName": "Coca", "Price": 100, "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQaVzq7y5C9SHWYu2kqHvd_aPN2oVPFvRdzQ&s" },
                { "ProductId": "p2", "ProductName": "Pepsi", "Price": 300, "Image": "https://cdn.tgdd.vn/Products/Images/2443/76467/bhx/nuoc-ngot-pepsi-cola-lon-320ml-202407131656260952.jpg" },
                { "ProductId": "p3", "ProductName": "Sting", "Price": 200, "Image": "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3226/76520/bhx/nuoc-tang-luc-sting-dau-pet-330ml_202509291516185862.jpg" },
            ]
        },
        {
            "Cateid": "cate2", "CateName": "Bia",
            "Products": [
                { "ProductId": "p4", "ProductName": "Heleiken", "Price": 500, "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZZYl2Typ8IjZU0zfBOBSRb7r_to-03cwU3g&s" },
                { "ProductId": "p5", "ProductName": "333", "Price": 400, "Image": "https://cdn.tgdd.vn/Products/Images/2282/195211/bhx/6-lon-bia-333-330ml-202003251338052607.jpg" },
                { "ProductId": "p6", "ProductName": "Sai Gon", "Price": 600, "Image": "https://cdn.tgdd.vn/Products/Images/2282/158349/bhx/thung-24-lon-bia-sai-gon-lager-330ml-202110111038144356.jpg" },
            ]
        },
    ]

    constructor() { }

    getCategories() {
        return this.datas;
    }
}
