import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../interfaces/invoice';

@Component({
  selector: 'app-create-invoice',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
})
export class CreateInvoiceComponent {
  newDetail = {
    productNumber: '',
    description: '',
    quantity: 0,
    unitPrice: 0,
    iva: 0,
    ivaValue: 0, // Calculado automáticamente
  };
  invoiceForm: FormGroup;
  ivaOptions = [0, 12, 19]; // %

  totalSnIva: number = 0;
  totalIva: number = 0;
  totalCnIva: number = 0;

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {
    this.invoiceForm = this.fb.group({
      header: this.fb.group({
        clientName: ['', Validators.required],
        documentNumber: ['', Validators.required],
        address: ['', Validators.required],
      }),
      details: this.fb.array([]),
    });
  }

  // Obtener el FormArray de detalles
  get details(): FormArray {
    return this.invoiceForm.get('details') as FormArray;
  }

  // Crear un grupo de detalle
  private createDetail(): FormGroup {
    return this.fb.group({
      productNumber: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      iva: [0, Validators.required],
      ivaValue: [0],
      total: [0],
    });
  }

  addDetail(): void {
    const newDetail = this.newDetail;

    const detail = this.createDetail();

    // Asignar los valores a los campos correspondientes
    detail.patchValue({
      productNumber: newDetail.productNumber,
      description: newDetail.description,
      quantity: newDetail.quantity,
      unitPrice: newDetail.unitPrice,
      iva: newDetail.iva,
    });

    // Ahora calculamos los valores de ivaValue y total
    const unitPrice = detail.get('unitPrice')?.value || 0;
    const iva = detail.get('iva')?.value || 0;
    const quantity = detail.get('quantity')?.value || 1;

    const ivaValue = unitPrice * (iva / 100);
    const total = (unitPrice + ivaValue) * quantity;

    // Actualizamos los valores de ivaValue y total en el FormGroup
    detail.patchValue({ ivaValue, total });

    this.details.push(detail);
    this.calculateTotals();
    this.resetNewDetail();
  }

  // Eliminar un detalle específico
  removeDetail(index: number): void {
    this.details.removeAt(index);
    this.calculateTotals();
  }

  resetNewDetail(): void {
    this.newDetail = {
      productNumber: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      iva: 0,
      ivaValue: 0,
    };
  }

  // Calcular totales
  calculateTotals(): void {
    this.totalSnIva = this.details.controls.reduce(
      (sum, detail) => sum + detail.value.quantity * detail.value.unitPrice,
      0
    );
    this.totalIva = this.details.controls.reduce(
      (sum, detail) => sum + detail.value.quantity * detail.value.ivaValue,
      0
    );
    this.totalCnIva = this.totalSnIva + this.totalIva;
  }

  // Guardar factura
  saveInvoice(): void {
    if (this.invoiceForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    const invoice: Invoice = {
      id: Date.now(),
      header: this.invoiceForm.value.header,
      details: this.invoiceForm.value.details,
    };

    console.log('Factura a guardar:', invoice);

    this.invoiceService.saveInvoice(invoice);
    alert('Factura guardada!');
    this.resetInvoice();
  }

  resetInvoice(): void {
    this.invoiceForm.reset();
    this.details.clear();
  }
}
