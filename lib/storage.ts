import { Client, Invoice, CompanyInfo } from "./types";

const CLIENTS_KEY = "invoice-app-clients";
const INVOICES_KEY = "invoice-app-invoices";
const INVOICE_COUNTER_KEY = "invoice-app-counter";
const COMPANY_INFO_KEY = "invoice-app-company";

// Generate unique ID
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Generate invoice number
export function generateInvoiceNumber(): string {
    if (typeof window === "undefined") return "INV-0001";

    const counter = parseInt(localStorage.getItem(INVOICE_COUNTER_KEY) || "0", 10) + 1;
    localStorage.setItem(INVOICE_COUNTER_KEY, counter.toString());
    return `INV-${counter.toString().padStart(4, "0")}`;
}

// Client operations
export function getClients(): Client[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(CLIENTS_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveClient(client: Client): void {
    const clients = getClients();
    const existingIndex = clients.findIndex((c) => c.id === client.id);

    if (existingIndex >= 0) {
        clients[existingIndex] = client;
    } else {
        clients.push(client);
    }

    localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

export function deleteClient(clientId: string): void {
    const clients = getClients().filter((c) => c.id !== clientId);
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

export function getClientById(clientId: string): Client | undefined {
    return getClients().find((c) => c.id === clientId);
}

// Invoice operations
export function getInvoices(): Invoice[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(INVOICES_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveInvoice(invoice: Invoice): void {
    const invoices = getInvoices();
    const existingIndex = invoices.findIndex((i) => i.id === invoice.id);

    if (existingIndex >= 0) {
        invoices[existingIndex] = { ...invoice, updatedAt: new Date().toISOString() };
    } else {
        invoices.push(invoice);
    }

    localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
}

export function deleteInvoice(invoiceId: string): void {
    const invoices = getInvoices().filter((i) => i.id !== invoiceId);
    localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
}

export function getInvoiceById(invoiceId: string): Invoice | undefined {
    return getInvoices().find((i) => i.id === invoiceId);
}

export function toggleInvoiceStatus(invoiceId: string): Invoice | undefined {
    const invoices = getInvoices();
    const invoice = invoices.find((i) => i.id === invoiceId);

    if (invoice) {
        invoice.isPaid = !invoice.isPaid;
        invoice.updatedAt = new Date().toISOString();
        localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
        return invoice;
    }

    return undefined;
}

// Company Info operations
export function getCompanyInfo(): CompanyInfo {
    if (typeof window === "undefined") {
        return { name: "", email: "", phone: "", address: "" };
    }
    const data = localStorage.getItem(COMPANY_INFO_KEY);
    return data ? JSON.parse(data) : { name: "", email: "", phone: "", address: "" };
}

export function saveCompanyInfo(info: CompanyInfo): void {
    localStorage.setItem(COMPANY_INFO_KEY, JSON.stringify(info));
}
