import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LunarYearComponent } from './lunar-year/lunar-year';
import { Listcustomer } from './listcustomer/listcustomer';

const routes: Routes = [
  // { path: '', component: Listcustomer }, 
  { path: 'listcustomer', component: Listcustomer }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
