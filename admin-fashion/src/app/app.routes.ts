import { Routes } from '@angular/router';
import { FashionListComponent } from './fashion-list/fashion-list.component';
import { FashionFormComponent } from './fashion-form/fashion-form.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/fashions', pathMatch: 'full' },
  { path: 'fashions', component: FashionListComponent },
  { path: 'fashions/add', component: FashionFormComponent },
  { path: 'fashions/edit/:id', component: FashionFormComponent },
  { path: 'fashions/:id', component: FashionDetailComponent },
];
