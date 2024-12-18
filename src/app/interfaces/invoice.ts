export interface Invoice {
  id: number;
  header: InvoiceHeader;
  details: InvoiceDetail[];
}

export interface InvoiceHeader {
  clientName: string;
  documentNumber: string;
  address: string;
}

export interface InvoiceDetail {
  productNumber: string;
  description: string;
  quantity: number;
  unitPrice: number;
  iva: number;
  ivaValue: number; // unitPrice * iva
  total: number; // (unitPrice + ivaValue) * quantity
}
