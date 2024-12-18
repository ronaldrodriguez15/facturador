import { Injectable } from '@angular/core';
import { Invoice } from '../interfaces/invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly localStorageKey = 'invoices';

  constructor() {}

  // Obtener facturas
  getInvoices(): Invoice[] {
    if (typeof window !== 'undefined' && localStorage) {
      const invoices = localStorage.getItem(this.localStorageKey);
      return invoices ? JSON.parse(invoices) : [];
    }
    return [];
  }

  // Guardar nueva factura
  saveInvoice(invoice: Invoice): void {
    const invoices = this.getInvoices();
    invoices.push(invoice);
    localStorage.setItem(this.localStorageKey, JSON.stringify(invoices));
  }

  // Buscar por nombre o documento
  searchInvoices(query: string): Invoice[] {
    const invoices = this.getInvoices();
    return invoices.filter(
      (invoice) =>
        invoice.header.clientName.toLowerCase().includes(query.toLowerCase()) ||
        invoice.header.documentNumber.includes(query)
    );
  }
}
