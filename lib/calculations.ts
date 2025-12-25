import { Invoice, InvoiceItem } from "./types";

// Calculate item total before discount
export function getItemSubtotal(item: InvoiceItem): number {
    return item.quantity * item.pricePerUnit;
}

// Calculate item discount amount
export function getItemDiscountAmount(item: InvoiceItem): number {
    const subtotal = getItemSubtotal(item);
    return subtotal * (item.discount / 100);
}

// Calculate item total after discount
export function getItemTotal(item: InvoiceItem): number {
    return getItemSubtotal(item) - getItemDiscountAmount(item);
}

// Calculate invoice subtotal (sum of all items after individual discounts)
export function getInvoiceSubtotal(items: InvoiceItem[]): number {
    return items.reduce((sum, item) => sum + getItemTotal(item), 0);
}

// Calculate total discount amount
export function getTotalDiscount(items: InvoiceItem[]): number {
    return items.reduce((sum, item) => sum + getItemDiscountAmount(item), 0);
}

// Calculate tax amount (only on taxable items)
export function getTaxAmount(items: InvoiceItem[], taxRate: number): number {
    const taxableTotal = items
        .filter((item) => item.taxable)
        .reduce((sum, item) => sum + getItemTotal(item), 0);
    return taxableTotal * (taxRate / 100);
}

// Calculate final total
export function getInvoiceTotal(invoice: Invoice): number {
    const subtotal = getInvoiceSubtotal(invoice.items);
    const tax = getTaxAmount(invoice.items, invoice.taxRate);
    return subtotal + tax;
}

// Format currency
export function formatCurrency(amount: number, currencySymbol: string): string {
    return `${currencySymbol}${amount.toFixed(2)}`;
}
