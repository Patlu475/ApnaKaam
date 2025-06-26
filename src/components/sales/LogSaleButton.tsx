"use client"

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { LogSaleForm } from './LogSaleForm';

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  cost?: number;
  lowStockThreshold: number;
  tags: string[];
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface SaleRecord {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  type: 'sale' | 'restock';
  note: string;
  timestamp: string;
}

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
  const isMobile = useIsMobile();

  const handleSubmit = (data: SaleRecord) => {
    console.log('New transaction:', data);
    
    // Call the parent callback if provided
    if (onSaleCreated) {
      onSaleCreated(data);
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
