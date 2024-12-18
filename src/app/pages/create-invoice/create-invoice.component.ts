import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice, InvoiceDetail, InvoiceHeader } from '../../interfaces/invoice';

@Component({
  selector: 'app-create-invoice',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss'
})
export class CreateInvoiceComponent {
  header: InvoiceHeader = { clientName: '', documentNumber: '', address: '' };
  details: InvoiceDetail[] = [];
  ivaOptions = [0, 12, 19]; // %
  totalSnIva: number = 0;
  totalIva: number = 0;
  totalCnIva: number = 0;

  newDetail: InvoiceDetail = {
    productNumber: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
    iva: 0,
    ivaValue: 0,
    total: 0
  };

  constructor(private invoiceService: InvoiceService) {}

  // Agregar detalle a la factura
  addDetail(detail: InvoiceDetail): void {
    detail.ivaValue = detail.unitPrice * (detail.iva / 100);
    detail.total = (detail.unitPrice + detail.ivaValue) * detail.quantity;
    this.details.push({ ...detail });
    this.calculateTotals();
    this.resetNewDetail();
  }

  // Eliminar un detalle específico
  removeDetail(detail: InvoiceDetail): void {
    this.details = this.details.filter((d) => d !== detail);
    this.calculateTotals();
  }

  // Calcular totales
  calculateTotals(): void {
    this.totalSnIva = this.details.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0); // Total sin IVA
    this.totalIva = this.details.reduce((sum, item) => sum + item.quantity * item.ivaValue, 0); // Total del IVA
    this.totalCnIva = this.totalSnIva + this.totalIva; // Total con IVA
  }

  // Reiniciar campos del detalle temporal
  resetNewDetail(): void {
    this.newDetail = {
      productNumber: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      iva: 0,
      ivaValue: 0,
      total: 0
    };
  }

  // Guardar factura
  saveInvoice(): void {
    const invoice: Invoice = {
      id: Date.now(),
      header: this.header,
      details: this.details
    };
    this.invoiceService.saveInvoice(invoice);
    alert('Factura guardada!');
    this.resetInvoice();
  }

  // Reiniciar la factura completa
  resetInvoice(): void {
    this.header = { clientName: '', documentNumber: '', address: '' };
    this.details = [];
    this.totalSnIva = 0;
    this.totalIva = 0;
    this.totalCnIva = 0;
    this.resetNewDetail();
  }
}
