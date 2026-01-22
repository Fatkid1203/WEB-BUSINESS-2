import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LunarYearComponent } from './lunar-year/lunar-year';
import { Listcustomer } from './listcustomer/listcustomer';
import { About } from './about/about';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Notfound } from './notfound/notfound';
import { Listproduct } from './listproduct/listproduct';
import { Productdetail } from './productdetail/productdetail';

import { ServiceProductImageEvent } from './ex13/service-product-image-event/service-product-image-event';
import { ServiceProductImageEventDetail } from './ex13/service-product-image-event-detail/service-product-image-event-detail';
import { Ex18 } from './ex18/ex18';

const routes: Routes = [
  // { path: '', component: Listcustomer }, 
  { path: "gioi-thieu", component: About },
  { path: "khach-hang-1", component: Listcustomer },
  { path: "khach-hang-2", component: Listcustomer2 },
  { path: "san-pham-1", component: Listproduct },
  { path: "san-pham-1/:id", component: Productdetail },
  { path: 'service-product-image-event', component: ServiceProductImageEvent },
  { path: 'service-product-image-event/:id', component: ServiceProductImageEventDetail },
  { path: 'exercise-18', component: Ex18 },

  { path: "**", component: Notfound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
