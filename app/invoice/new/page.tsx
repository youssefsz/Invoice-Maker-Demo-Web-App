"use client";

import { useState, useEffect, useCallback } from "react";
import { CompanyInfo } from "@/lib/types";
import { getCompanyInfo } from "@/lib/storage";
import { InvoiceForm } from "@/components/invoice-form";
import { useRouter } from "next/navigation";

export default function NewInvoicePage() {
    const router = useRouter();
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({ name: "", email: "", phone: "", address: "" });

    const loadCompanyInfo = useCallback(() => {
        setCompanyInfo(getCompanyInfo());
    }, []);

    useEffect(() => {
        loadCompanyInfo();
    }, [loadCompanyInfo]);

    const handleClose = () => {
        router.push("/");
    };

    const handleSave = () => {
        router.push("/");
    };

    return (
        <div className="min-h-full bg-background">
            <InvoiceForm
                onClose={handleClose}
                onSave={handleSave}
                companyInfo={companyInfo}
            />
        </div>
    );
}
