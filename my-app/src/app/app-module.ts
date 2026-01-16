import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';

import { AppComponent } from './app';
import { LunarYearComponent } from './lunar-year/lunar-year';
import { Listcustomer } from './listcustomer/listcustomer';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Customerdetail } from './customerdetail/customerdetail';
import { Catalog } from './catalog/catalog';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LunarYearComponent,     // ✅ import standalone
    Listcustomer2           // ✅ import standalone
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    Listcustomer,
    Customerdetail,
    Catalog
  ]
})
export class AppModule { }
