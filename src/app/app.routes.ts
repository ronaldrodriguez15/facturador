import { Routes } from '@angular/router';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './pages/create-invoice/create-invoice.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

// Define las rutas aquí
export const routes: Routes = [
  { path: 'invoice-list', component: InvoiceListComponent },
  { path: 'invoice-detail/:id', component: InvoiceDetailComponent },
  { path: 'create-invoice', component: CreateInvoiceComponent },
  { path: '', redirectTo: '/invoice-list', pathMatch: 'full' },
];
