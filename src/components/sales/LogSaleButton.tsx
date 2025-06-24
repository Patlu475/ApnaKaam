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

export const LogSaleButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = (data: any) => {
    console.log('New transaction:', data);
    // Here you would typically save to your data store
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size="sm" className="gap-1">
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
          <LogSaleForm onClose={() => setIsOpen(false)} onSubmit={handleSubmit} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
