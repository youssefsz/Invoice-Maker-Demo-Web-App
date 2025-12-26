// Company/Business Profile type
export interface CompanyInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
    bankName?: string;
    iban?: string;
    swift?: string;
}

// Client type
export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
}

// Invoice item type
export interface InvoiceItem {
    id: string;
    name: string;
    quantity: number;
    pricePerUnit: number;
    discount: number; // percentage
    taxable: boolean;
}

// Saved item type for reusable items
export interface SavedItem {
    id: string;
    name: string;
    defaultPrice: number;
    createdAt: string;
}

// Due date options
export type DueDateOption = "none" | "receipt" | "10" | "15" | "30";

// Invoice type
export interface Invoice {
    id: string;
    invoiceNumber: string;
    clientId: string;
    currency: string;
    note: string;
    items: InvoiceItem[];
    taxRate: number; // percentage
    isPaid: boolean;
    dueDate: DueDateOption;
    createdAt: string;
    updatedAt: string;
}

// Currency options
export const CURRENCIES = [
    { code: "TND", symbol: "TND", name: "Tunisian Dinar" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

// Helper to get currency symbol
export function getCurrencySymbol(code: string): string {
    const currency = CURRENCIES.find((c) => c.code === code);
    return currency?.symbol || code;
}
