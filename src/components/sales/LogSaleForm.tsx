"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import { Package, TrendingUp, Save } from 'lucide-react';

interface LogSaleFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const LogSaleForm: React.FC<LogSaleFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    type: 'sale' as 'sale' | 'restock',
    note: ''
  });

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    onSubmit({
      ...formData,
      quantity: parseInt(formData.quantity),
      timestamp: new Date().toISOString()
    });
    onClose();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="productName">Product Name</Label>
        <Input
          id="productName"
          type="text"
          required
          value={formData.productName}
          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          placeholder="Enter product name"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          required
          min="1"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          placeholder="Enter quantity"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Transaction Type</Label>
        <div className="flex gap-3">
          <Button
            type="button"
            variant={formData.type === 'sale' ? "default" : "outline"}
            className="flex items-center gap-2 flex-1"
            onClick={() => setFormData({ ...formData, type: 'sale' })}
          >
            <TrendingUp className="h-4 w-4" />
            Sale
          </Button>
          <Button
            type="button"
            variant={formData.type === 'restock' ? "default" : "outline"}
            className="flex items-center gap-2 flex-1"
            onClick={() => setFormData({ ...formData, type: 'restock' })}
          >
            <Package className="h-4 w-4" />
            Restock
          </Button>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <Label htmlFor="note">Note (Optional)</Label>
        <Textarea
          id="note"
          rows={3}
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          placeholder="Add a note about this transaction..."
        />
      </div>
      
      <DrawerFooter className="px-0">
        <Button type="submit" onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Save Transaction
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </form>
  );
};
