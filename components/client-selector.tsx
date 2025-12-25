"use client";

import { useState, useEffect } from "react";
import { Client } from "@/lib/types";
import { getClients, saveClient, generateId } from "@/lib/storage";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, User } from "lucide-react";

interface ClientSelectorProps {
    selectedClientId: string;
    onClientSelect: (clientId: string) => void;
}

export function ClientSelector({
    selectedClientId,
    onClientSelect,
}: ClientSelectorProps) {
    const [clients, setClients] = useState<Client[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newClient, setNewClient] = useState<Omit<Client, "id" | "createdAt">>({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        setClients(getClients());
    }, []);

    const handleCreateClient = () => {
        if (!newClient.name.trim()) return;

        const client: Client = {
            ...newClient,
            id: generateId(),
            createdAt: new Date().toISOString(),
        };

        saveClient(client);
        setClients(getClients());
        onClientSelect(client.id);
        setIsDialogOpen(false);
        setNewClient({ name: "", email: "", phone: "", address: "" });
    };

    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium">Client</Label>
            <div className="flex gap-2">
                <Select value={selectedClientId} onValueChange={onClientSelect}>
                    <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                        {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    {client.name}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="transition-transform duration-200 hover:scale-105 active:scale-95">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add New Client</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name *</Label>
                                <Input
                                    id="name"
                                    value={newClient.name}
                                    onChange={(e) =>
                                        setNewClient({ ...newClient, name: e.target.value })
                                    }
                                    placeholder="Client name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={newClient.email}
                                    onChange={(e) =>
                                        setNewClient({ ...newClient, email: e.target.value })
                                    }
                                    placeholder="client@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={newClient.phone}
                                    onChange={(e) =>
                                        setNewClient({ ...newClient, phone: e.target.value })
                                    }
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={newClient.address}
                                    onChange={(e) =>
                                        setNewClient({ ...newClient, address: e.target.value })
                                    }
                                    placeholder="123 Main St, City, Country"
                                />
                            </div>
                            <Button
                                onClick={handleCreateClient}
                                className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                disabled={!newClient.name.trim()}
                            >
                                Add Client
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
