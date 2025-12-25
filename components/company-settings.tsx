"use client";

import { useState, useEffect } from "react";
import { CompanyInfo } from "@/lib/types";
import { getCompanyInfo, saveCompanyInfo } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Building2 } from "lucide-react";

interface CompanySettingsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave?: () => void;
}

export function CompanySettings({ open, onOpenChange, onSave }: CompanySettingsProps) {
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (open) {
            setCompanyInfo(getCompanyInfo());
        }
    }, [open]);

    const handleSave = () => {
        saveCompanyInfo(companyInfo);
        onSave?.();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Business Profile
                    </DialogTitle>
                    <DialogDescription>
                        This information will appear on all your invoices.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="company-name">Business Name *</Label>
                        <Input
                            id="company-name"
                            value={companyInfo.name}
                            onChange={(e) =>
                                setCompanyInfo({ ...companyInfo, name: e.target.value })
                            }
                            placeholder="Your Company Name"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company-email">Email</Label>
                        <Input
                            id="company-email"
                            type="email"
                            value={companyInfo.email}
                            onChange={(e) =>
                                setCompanyInfo({ ...companyInfo, email: e.target.value })
                            }
                            placeholder="contact@yourcompany.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company-phone">Phone</Label>
                        <Input
                            id="company-phone"
                            value={companyInfo.phone}
                            onChange={(e) =>
                                setCompanyInfo({ ...companyInfo, phone: e.target.value })
                            }
                            placeholder="+1 234 567 890"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company-address">Address</Label>
                        <Input
                            id="company-address"
                            value={companyInfo.address}
                            onChange={(e) =>
                                setCompanyInfo({ ...companyInfo, address: e.target.value })
                            }
                            placeholder="123 Business St, City, Country"
                        />
                    </div>
                    <Button
                        onClick={handleSave}
                        className="w-full mt-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        disabled={!companyInfo.name.trim()}
                    >
                        Save Business Profile
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
