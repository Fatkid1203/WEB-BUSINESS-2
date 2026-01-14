import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LunarYearComponent } from './lunar-year/lunar-year';

const routes: Routes = [
  { path: '', component: LunarYearComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
