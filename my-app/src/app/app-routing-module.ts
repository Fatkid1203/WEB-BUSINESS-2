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
import { Ex19 } from './ex19/ex19';
import { Product } from './ex19/product/product';
import { ListProduct } from './ex19/list-product/list-product';
import { ServiceProduct } from './ex19/service-product/service-product';
import { FakeProduct } from './fake-product/fake-product';
import { Books } from './books/books';
import { Ex27 } from './ex27/ex27';
import { Ex28 } from './ex28/ex28';
import { ReactiveFormComponent } from './reactive-form/reactive-form';
import { TemplateFormComponent } from './template-form/template-form';
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
  { path: 'exercise-19', component: Ex19 },
  { path: 'product', component: Product },
  { path: 'list-product', component: ListProduct },
  { path: 'service-product', component: ServiceProduct },
  { path: 'ex26', component: FakeProduct },
  { path: 'ex27', component: Ex27 },
  { path: 'ex28', component: Ex28 },
  { path: 'ex39', component: Books },
  { path: 'reactive-form', component: ReactiveFormComponent },
  { path: 'template-form', component: TemplateFormComponent },
  { path: "**", component: Notfound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent = [
  Product,
  ListProduct,
  ServiceProduct
]
