import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app';
import { LunarYearComponent } from './lunar-year/lunar-year';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: LunarYearComponent }
    ]),
    AppComponent,          // ✅ import standalone
    LunarYearComponent     // ✅ import standalone
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
