// Invoice translations for multilingual PDF export

export type InvoiceLanguage = "en" | "fr";

export interface InvoiceTranslations {
    invoice: string;
    issued: string;
    from: string;
    billTo: string;
    description: string;
    qty: string;
    unitPrice: string;
    amount: string;
    noItems: string;
    subtotal: string;
    discount: string;
    tax: string;
    total: string;
    notes: string;
    authorizedSignature: string;
    noClientSelected: string;
    pageOf: (current: number, total: number) => string;
    // Receipt-specific translations
    receipt: string;
    paymentReceipt: string;
    receivedFrom: string;
    paidDate: string;
    paymentFor: string;
    amountPaid: string;
    thankYou: string;
    paidInFull: string;
    receiptNumber: string;
    paymentConditions: string;
    paymentDueReceipt: string;
    paymentDue10Days: string;
    paymentDue15Days: string;
    paymentDue30Days: string;
}

const translations: Record<InvoiceLanguage, InvoiceTranslations> = {
    en: {
        invoice: "INVOICE",
        issued: "Issued",
        from: "FROM",
        billTo: "BILL TO",
        description: "Description",
        qty: "Qty",
        unitPrice: "Unit Price",
        amount: "Amount",
        noItems: "No items added",
        subtotal: "Subtotal",
        discount: "Discount",
        tax: "Tax",
        total: "Total",
        notes: "Notes",
        authorizedSignature: "Authorized Signature",
        noClientSelected: "No client selected",
        pageOf: (current, total) => `${current} of ${total}`,
        // Receipt-specific translations
        receipt: "RECEIPT",
        paymentReceipt: "Payment Receipt",
        receivedFrom: "RECEIVED FROM",
        paidDate: "Paid",
        paymentFor: "Payment For",
        amountPaid: "Amount Paid",
        thankYou: "Thank you for your payment!",
        paidInFull: "PAID IN FULL",
        receiptNumber: "Receipt #",
        paymentConditions: "Payment Terms & Conditions",
        paymentDueReceipt: "Payment is due on receipt",
        paymentDue10Days: "Payment is due in 10 days",
        paymentDue15Days: "Payment is due in 15 days",
        paymentDue30Days: "Payment is due in 30 days",
    },
    fr: {
        invoice: "FACTURE",
        issued: "Émise le",
        from: "DE",
        billTo: "FACTURER À",
        description: "Description",
        qty: "Qté",
        unitPrice: "Prix Unitaire",
        amount: "Montant",
        noItems: "Aucun article ajouté",
        subtotal: "Sous-total",
        discount: "Remise",
        tax: "Taxe",
        total: "Total",
        notes: "Notes",
        authorizedSignature: "Signature Autorisée",
        noClientSelected: "Aucun client sélectionné",
        pageOf: (current, total) => `${current} sur ${total}`,
        // Receipt-specific translations
        receipt: "REÇU",
        paymentReceipt: "Reçu de Paiement",
        receivedFrom: "REÇU DE",
        paidDate: "Payé le",
        paymentFor: "Paiement Pour",
        amountPaid: "Montant Payé",
        thankYou: "Merci pour votre paiement!",
        paidInFull: "PAYÉ EN TOTALITÉ",
        receiptNumber: "Reçu #",
        paymentConditions: "Conditions et modalités de paiement",
        paymentDueReceipt: "Le paiement est dû à réception",
        paymentDue10Days: "Le paiement est dû dans 10 jours",
        paymentDue15Days: "Le paiement est dû dans 15 jours",
        paymentDue30Days: "Le paiement est dû dans 30 jours",
    },
};

export function getTranslations(language: InvoiceLanguage): InvoiceTranslations {
    return translations[language];
}

export const LANGUAGE_OPTIONS: { code: InvoiceLanguage; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
];
