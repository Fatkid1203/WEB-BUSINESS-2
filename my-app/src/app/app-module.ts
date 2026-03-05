import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app';
import { LunarYearComponent } from './lunar-year/lunar-year';
import { Listcustomer } from './listcustomer/listcustomer';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Customerdetail } from './customerdetail/customerdetail';
import { Catalog } from './catalog/catalog';
import { About } from './about/about';
import { Notfound } from './notfound/notfound';
import { Listproduct } from './listproduct/listproduct';
import { Productdetail } from './productdetail/productdetail';
import { Ex13 } from './ex13/ex13';
import { ServiceProductImageEventDetail } from './ex13/service-product-image-event-detail/service-product-image-event-detail';
import { ServiceProductImageEvent } from './ex13/service-product-image-event/service-product-image-event';
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
import { FileUpload } from './file-upload/file-upload';
import { BookDetailComponent } from './books/book-detail/book-detail';
import { BookFormComponent } from './books/book-form/book-form';
import { BookUpdateComponent } from './book-update/book-update';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LunarYearComponent,     // ✅ import standalone
    Listcustomer2,           // ✅ import standalone
    HttpClientModule,
    ReactiveFormComponent,
    TemplateFormComponent,
    BookDetailComponent,
    BookFormComponent,
    BookUpdateComponent,
    LoginComponent,
    ShopComponent,
    CartComponent
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    Listcustomer,
    Customerdetail,
    Catalog,
    About,
    Notfound,
    Listproduct,
    Productdetail,
    Ex13,
    ServiceProductImageEventDetail,
    ServiceProductImageEvent,
    Ex18,
    Ex19,
    Product,
    ListProduct,
    ServiceProduct,
    FakeProduct,
    Books,
    Ex27,
    Ex28,
    Ex27,
    Ex28,
    FileUpload,
    FileUpload
  ]
})
export class AppModule { }
