"use client"

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { LogSaleForm } from './LogSaleForm';
import { Product, SaleFormData, SaleRecord } from '@/types/sales';

interface LogSaleButtonProps {
  products?: Product[];
  onSaleCreated?: (sale: SaleRecord) => void;
  isLoading?: boolean;
}

export const LogSaleButton: React.FC<LogSaleButtonProps> = ({ 
  products = [], 
  onSaleCreated, 
  isLoading = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: SaleFormData) => {
    console.log('New transaction data:', data);
    
    try {
      // Create form data to submit
      const submitData = new FormData();
      submitData.append('productId', data.productId);
      submitData.append('quantity', data.quantity.toString());
      submitData.append('type', data.type);
      submitData.append('note', data.note || '');
      
      // Call the API endpoint
      const response = await fetch('/api/sales', {
        method: 'POST',
        body: submitData
      });
      
      if (!response.ok) {
        throw new Error('Failed to create sale');
      }
      
      const saleRecord: SaleRecord = await response.json();
      
      // Call the parent callback with the complete sale record
      if (onSaleCreated) {
        onSaleCreated(saleRecord);
      }
      
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to create transaction:', error);
      // You might want to show an error toast here
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size="sm" className="gap-1" disabled={isLoading}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Log Sale</span>
        </Button>
      </DrawerTrigger>
      
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Log New Transaction</DrawerTitle>
          <DrawerDescription>
            Record a new sale or restock transaction in your inventory.
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <LogSaleForm 
            onClose={() => setIsOpen(false)} 
            onSubmit={handleSubmit} 
            productsList={products}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
