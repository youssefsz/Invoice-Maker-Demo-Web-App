"use client";

import { useState, useEffect, useCallback } from "react";
import { Invoice, CompanyInfo } from "@/lib/types";
import { getInvoices, getCompanyInfo } from "@/lib/storage";
import { InvoiceForm } from "@/components/invoice-form";
import { useRouter, useParams } from "next/navigation";

export default function EditInvoicePage() {
    const router = useRouter();
    const params = useParams();
    const invoiceId = params.id as string;

    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({ name: "", email: "", phone: "", address: "" });
    const [isLoading, setIsLoading] = useState(true);

    const loadInvoice = useCallback(() => {
        const invoices = getInvoices();
        const found = invoices.find((inv) => inv.id === invoiceId);
        setInvoice(found || null);
        setIsLoading(false);
    }, [invoiceId]);

    const loadCompanyInfo = useCallback(() => {
        setCompanyInfo(getCompanyInfo());
    }, []);

    useEffect(() => {
        loadInvoice();
        loadCompanyInfo();
    }, [loadInvoice, loadCompanyInfo]);

    const handleClose = () => {
        router.push(`/invoice/${invoiceId}`);
    };

    const handleSave = () => {
        router.push("/");
    };

    const handleDelete = () => {
        router.push("/");
    };

    if (isLoading) {
        return (
            <div className="min-h-full bg-background flex items-center justify-center">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="min-h-full bg-background flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Invoice not found</h2>
                    <button
                        onClick={() => router.push("/")}
                        className="text-primary hover:underline"
                    >
                        Go back to dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-full bg-background">
            <InvoiceForm
                existingInvoice={invoice}
                onClose={handleClose}
                onSave={handleSave}
                onDelete={handleDelete}
                companyInfo={companyInfo}
            />
        </div>
    );
}
