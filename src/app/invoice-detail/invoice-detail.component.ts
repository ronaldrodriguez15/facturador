import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../interfaces/invoice';

@Component({
  selector: 'app-invoice-detail',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss',
})
export class InvoiceDetailComponent {

  invoice: Invoice | undefined;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    const invoiceId = this.route.snapshot.paramMap.get('id');
    if (invoiceId) {
      this.invoice = this.invoiceService
        .getInvoices()
        .find((invoice) => invoice.id === +invoiceId);
    }
  }
}
