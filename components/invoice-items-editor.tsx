"use client";

import { InvoiceItem } from "@/lib/types";
import { generateId } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface InvoiceItemsEditorProps {
    items: InvoiceItem[];
    onChange: (items: InvoiceItem[]) => void;
    currencySymbol: string;
}

const createEmptyItem = (): InvoiceItem => ({
    id: generateId(),
    name: "",
    quantity: 1,
    pricePerUnit: 0,
    discount: 0,
    taxable: false,
});

export function InvoiceItemsEditor({
    items,
    onChange,
    currencySymbol,
}: InvoiceItemsEditorProps) {
    const addItem = () => {
        onChange([...items, createEmptyItem()]);
    };

    const removeItem = (id: string) => {
        onChange(items.filter((item) => item.id !== id));
    };

    const updateItem = (id: string, updates: Partial<InvoiceItem>) => {
        onChange(
            items.map((item) => (item.id === id ? { ...item, ...updates } : item))
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Items / Services</Label>
                <Button variant="outline" size="sm" onClick={addItem} className="transition-all duration-200 hover:scale-105 active:scale-95">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                </Button>
            </div>

            {items.length === 0 ? (
                <Card className="p-8 text-center border-dashed">
                    <p className="text-muted-foreground text-sm">
                        No items added yet. Click &quot;Add Item&quot; to get started.
                    </p>
                </Card>
            ) : (
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <Card key={item.id} className="p-4 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-2">
                                    <span className="text-xs text-muted-foreground font-medium">
                                        Item {index + 1}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-destructive hover:text-destructive transition-transform duration-200 hover:scale-110 active:scale-95"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs">Name</Label>
                                    <Input
                                        value={item.name}
                                        onChange={(e) => updateItem(item.id, { name: e.target.value })}
                                        placeholder="Item or service name"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label className="text-xs">Quantity</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateItem(item.id, {
                                                    quantity: Math.max(1, parseInt(e.target.value) || 1),
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs">Price ({currencySymbol})</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={item.pricePerUnit}
                                            onChange={(e) =>
                                                updateItem(item.id, {
                                                    pricePerUnit: Math.max(0, parseFloat(e.target.value) || 0),
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label className="text-xs">Discount (%)</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={item.discount}
                                            onChange={(e) =>
                                                updateItem(item.id, {
                                                    discount: Math.min(
                                                        100,
                                                        Math.max(0, parseFloat(e.target.value) || 0)
                                                    ),
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs">Taxable</Label>
                                        <div className="flex items-center h-9">
                                            <Switch
                                                checked={item.taxable}
                                                onCheckedChange={(checked) =>
                                                    updateItem(item.id, { taxable: checked })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 border-t flex justify-between items-center">
                                    <span className="text-xs text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">
                                        {currencySymbol}
                                        {(
                                            item.quantity *
                                            item.pricePerUnit *
                                            (1 - item.discount / 100)
                                        ).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
