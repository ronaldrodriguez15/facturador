import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../interfaces/invoice';

@Component({
  selector: 'app-invoice-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  searchQuery: string = '';
  selectedInvoice: Invoice | null = null;
  totalSnIva: number = 0;
  totalIva: number = 0;
  totalCnIva: number = 0;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoices = this.invoiceService.getInvoices();
  }

  onSearch(): void {
    this.invoices = this.invoiceService.searchInvoices(this.searchQuery);
  }

  showInvoiceDetails(invoice: Invoice): void {
    this.selectedInvoice = invoice;
    this.calculateTotals();
  }

  hideInvoiceDetails(): void {
    this.selectedInvoice = null;
  }

  calculateTotals(): void {
    if (this.selectedInvoice) {
      this.totalSnIva = this.selectedInvoice.details.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice, 0
      );
      this.totalIva = this.selectedInvoice.details.reduce(
        (sum, item) => sum + item.quantity * item.ivaValue, 0
      );
      this.totalCnIva = this.totalSnIva + this.totalIva;
    }
  }
}
