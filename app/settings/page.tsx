"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CompanyInfo, Client, SavedItem } from "@/lib/types";
import {
    getCompanyInfo,
    saveCompanyInfo,
    getClients,
    saveClient,
    deleteClient,
    getSavedItems,
    saveSavedItem,
    deleteSavedItem,
    generateId,
} from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    ArrowLeft,
    Building2,
    Users,
    Package,
    Plus,
    Pencil,
    Trash2,
    ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

type SettingsSection = "main" | "business" | "clients" | "items";

export default function SettingsPage() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState<SettingsSection>("main");

    // Business Profile State
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    // Clients State
    const [clients, setClients] = useState<Client[]>([]);
    const [showClientForm, setShowClientForm] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [clientForm, setClientForm] = useState<Omit<Client, "id" | "createdAt">>({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [deleteClientId, setDeleteClientId] = useState<string | null>(null);

    // Items State
    const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
    const [showItemForm, setShowItemForm] = useState(false);
    const [editingItem, setEditingItem] = useState<SavedItem | null>(null);
    const [itemForm, setItemForm] = useState<Omit<SavedItem, "id" | "createdAt">>({
        name: "",
        defaultPrice: 0,
    });
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

    useEffect(() => {
        setCompanyInfo(getCompanyInfo());
        setClients(getClients());
        setSavedItems(getSavedItems());
    }, []);

    // Business Profile Handlers
    const handleSaveCompanyInfo = () => {
        saveCompanyInfo(companyInfo);
        toast.success("Business profile saved successfully");
    };

    // Client Handlers
    const handleOpenClientForm = (client?: Client) => {
        if (client) {
            setEditingClient(client);
            setClientForm({
                name: client.name,
                email: client.email,
                phone: client.phone,
                address: client.address,
            });
        } else {
            setEditingClient(null);
            setClientForm({ name: "", email: "", phone: "", address: "" });
        }
        setShowClientForm(true);
    };

    const handleSaveClient = () => {
        if (!clientForm.name.trim()) return;

        const clientData: Client = {
            id: editingClient?.id || generateId(),
            ...clientForm,
            createdAt: editingClient?.createdAt || new Date().toISOString(),
        };

        saveClient(clientData);
        setClients(getClients());
        setShowClientForm(false);
        setEditingClient(null);
        toast.success(editingClient ? "Client updated" : "Client added");
    };

    const handleDeleteClient = () => {
        if (deleteClientId) {
            deleteClient(deleteClientId);
            setClients(getClients());
            setDeleteClientId(null);
            toast.success("Client deleted");
        }
    };

    // Item Handlers
    const handleOpenItemForm = (item?: SavedItem) => {
        if (item) {
            setEditingItem(item);
            setItemForm({
                name: item.name,
                defaultPrice: item.defaultPrice,
            });
        } else {
            setEditingItem(null);
            setItemForm({ name: "", defaultPrice: 0 });
        }
        setShowItemForm(true);
    };

    const handleSaveItem = () => {
        if (!itemForm.name.trim()) return;

        const itemData: SavedItem = {
            id: editingItem?.id || generateId(),
            ...itemForm,
            createdAt: editingItem?.createdAt || new Date().toISOString(),
        };

        saveSavedItem(itemData);
        setSavedItems(getSavedItems());
        setShowItemForm(false);
        setEditingItem(null);
        toast.success(editingItem ? "Item updated" : "Item added");
    };

    const handleDeleteItem = () => {
        if (deleteItemId) {
            deleteSavedItem(deleteItemId);
            setSavedItems(getSavedItems());
            setDeleteItemId(null);
            toast.success("Item deleted");
        }
    };

    const handleBack = () => {
        if (activeSection === "main") {
            router.back();
        } else {
            setActiveSection("main");
        }
    };

    const getTitle = () => {
        switch (activeSection) {
            case "business":
                return "Business Profile";
            case "clients":
                return "Clients";
            case "items":
                return "Saved Items";
            default:
                return "Settings";
        }
    };

    return (
        <div className="min-h-[100dvh] bg-background">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40">
                <div className="px-4 py-4 sm:px-6 flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBack}
                        className="-ml-2 text-foreground/80 hover:text-foreground hover:bg-transparent"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="font-bold text-xl flex-1">{getTitle()}</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-4 py-6 sm:px-6 max-w-lg mx-auto">
                {activeSection === "main" && (
                    <div className="space-y-2">
                        {/* Business Profile Option */}
                        <Card
                            className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                            onClick={() => setActiveSection("business")}
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Building2 className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">Business Profile</p>
                                    <p className="text-sm text-muted-foreground">
                                        Edit your company information
                                    </p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </Card>

                        {/* Clients Option */}
                        <Card
                            className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                            onClick={() => setActiveSection("clients")}
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                    <Users className="h-5 w-5 text-foreground" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">Clients</p>
                                    <p className="text-sm text-muted-foreground">
                                        Manage your client list ({clients.length})
                                    </p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </Card>

                        {/* Items Option */}
                        <Card
                            className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                            onClick={() => setActiveSection("items")}
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                    <Package className="h-5 w-5 text-foreground" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">Saved Items</p>
                                    <p className="text-sm text-muted-foreground">
                                        Manage reusable invoice items ({savedItems.length})
                                    </p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </Card>
                    </div>
                )}

                {activeSection === "business" && (
                    <div className="space-y-4">
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
                            onClick={handleSaveCompanyInfo}
                            className="w-full mt-6 bg-foreground text-background hover:bg-foreground/90 font-medium"
                            disabled={!companyInfo.name.trim()}
                        >
                            Save Changes
                        </Button>
                    </div>
                )}

                {activeSection === "clients" && (
                    <div className="space-y-4">
                        <Button
                            onClick={() => handleOpenClientForm()}
                            className="w-full gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add New Client
                        </Button>

                        {clients.length === 0 ? (
                            <Card className="p-8 text-center">
                                <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                                <p className="text-muted-foreground">No clients yet</p>
                                <p className="text-sm text-muted-foreground/70">
                                    Add your first client to get started
                                </p>
                            </Card>
                        ) : (
                            <div className="space-y-2">
                                {clients.map((client) => (
                                    <Card key={client.id} className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                                <Users className="h-5 w-5 text-foreground" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{client.name}</p>
                                                {client.email && (
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {client.email}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleOpenClientForm(client)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() => setDeleteClientId(client.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeSection === "items" && (
                    <div className="space-y-4">
                        <Button
                            onClick={() => handleOpenItemForm()}
                            className="w-full gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add New Item
                        </Button>

                        {savedItems.length === 0 ? (
                            <Card className="p-8 text-center">
                                <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                                <p className="text-muted-foreground">No saved items yet</p>
                                <p className="text-sm text-muted-foreground/70">
                                    Items you add here can be quickly added to invoices
                                </p>
                            </Card>
                        ) : (
                            <div className="space-y-2">
                                {savedItems.map((item) => (
                                    <Card key={item.id} className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                                <Package className="h-5 w-5 text-foreground" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Default: {item.defaultPrice.toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleOpenItemForm(item)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() => setDeleteItemId(item.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Client Form Dialog */}
            <Dialog open={showClientForm} onOpenChange={setShowClientForm}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {editingClient ? "Edit Client" : "Add New Client"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="client-name">Name *</Label>
                            <Input
                                id="client-name"
                                value={clientForm.name}
                                onChange={(e) =>
                                    setClientForm({ ...clientForm, name: e.target.value })
                                }
                                placeholder="Client name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-email">Email</Label>
                            <Input
                                id="client-email"
                                type="email"
                                value={clientForm.email}
                                onChange={(e) =>
                                    setClientForm({ ...clientForm, email: e.target.value })
                                }
                                placeholder="client@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-phone">Phone</Label>
                            <Input
                                id="client-phone"
                                value={clientForm.phone}
                                onChange={(e) =>
                                    setClientForm({ ...clientForm, phone: e.target.value })
                                }
                                placeholder="+1 234 567 890"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-address">Address</Label>
                            <Input
                                id="client-address"
                                value={clientForm.address}
                                onChange={(e) =>
                                    setClientForm({ ...clientForm, address: e.target.value })
                                }
                                placeholder="123 Main St, City, Country"
                            />
                        </div>
                        <Button
                            onClick={handleSaveClient}
                            className="w-full"
                            disabled={!clientForm.name.trim()}
                        >
                            {editingClient ? "Update Client" : "Add Client"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Item Form Dialog */}
            <Dialog open={showItemForm} onOpenChange={setShowItemForm}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem ? "Edit Item" : "Add New Item"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="item-name">Item Name *</Label>
                            <Input
                                id="item-name"
                                value={itemForm.name}
                                onChange={(e) =>
                                    setItemForm({ ...itemForm, name: e.target.value })
                                }
                                placeholder="e.g., Consulting Hour, Web Design"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="item-price">Default Price</Label>
                            <Input
                                id="item-price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={itemForm.defaultPrice}
                                onChange={(e) =>
                                    setItemForm({
                                        ...itemForm,
                                        defaultPrice: Math.max(0, parseFloat(e.target.value) || 0),
                                    })
                                }
                                placeholder="0.00"
                            />
                        </div>
                        <Button
                            onClick={handleSaveItem}
                            className="w-full"
                            disabled={!itemForm.name.trim()}
                        >
                            {editingItem ? "Update Item" : "Add Item"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Client Confirmation */}
            <AlertDialog
                open={!!deleteClientId}
                onOpenChange={(open) => !open && setDeleteClientId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Client?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this client. Existing invoices will not be affected.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteClient}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Item Confirmation */}
            <AlertDialog
                open={!!deleteItemId}
                onOpenChange={(open) => !open && setDeleteItemId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Item?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this saved item.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteItem}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
