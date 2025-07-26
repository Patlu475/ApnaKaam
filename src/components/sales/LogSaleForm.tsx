"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import { Package, TrendingUp, Save, AlertCircle, Loader2 } from 'lucide-react';
import { Combobox } from '@/components/ui/combobox';
import { toast } from "sonner";


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

interface SaleData {
  productId: string;
  productName: string;
  quantity: number;
  type: 'sale' | 'restock';
  note?: string;
}

interface LogSaleFormProps {
  onClose: () => void;
  onSubmit: (data: SaleData) => void;
  productsList?: Product[];
}

export const LogSaleForm: React.FC<LogSaleFormProps> = ({ onClose, onSubmit, productsList = [] }) => {
  const [products, setProducts] = useState<Product[]>(productsList);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    quantity: '',
    type: 'sale' as 'sale' | 'restock',
    note: ''
  });

  const [quantityError, setQuantityError] = useState<string | null>(null);

  // Fetch products if not provided
  useEffect(() => {
    if (productsList.length > 0) {
      setProducts(productsList);
    }

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const fetchedProducts = await response.json();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error("Failed to load products. Please refresh and try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productsList]);

  // Validate quantity based on transaction type and selected product
  const validateQuantity = (quantity: string, type: 'sale' | 'restock') => {
    if (!selectedProduct) return null;
    
    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return 'Quantity must be greater than 0';
    }
    
    if (type === 'sale' && parsedQuantity > selectedProduct.quantity) {
      return `Not enough stock. Available: ${selectedProduct.quantity}`;
    }
    
    return null;
  };

  const handleQuantityChange = (value: string) => {
    const error = validateQuantity(value, formData.type);
    setQuantityError(error);
    setFormData({ ...formData, quantity: value });
  };

  const handleProductChange = (value: string | number, productData?: Product) => {
    if (!productData) return;
    
    setSelectedProduct(productData);
    setFormData({
      ...formData,
      productId: value.toString(),
      productName: productData.name
    });
    
    // Re-validate quantity when product changes
    if (formData.quantity) {
      const error = validateQuantity(formData.quantity, formData.type);
      setQuantityError(error);
    }
  };

  const handleTypeChange = (type: 'sale' | 'restock') => {
    setFormData({ ...formData, type });
    
    // Re-validate quantity when type changes
    if (formData.quantity) {
      const error = validateQuantity(formData.quantity, type);
      setQuantityError(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.productId || !selectedProduct) {
      toast.error("Please select a product");
      return;
    }

    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    const error = validateQuantity(formData.quantity, formData.type);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Create form data to submit
      const submitData = new FormData();
      submitData.append('productId', formData.productId);
      submitData.append('quantity', formData.quantity);
      submitData.append('type', formData.type);
      submitData.append('note', formData.note || '');
      
      // Call the API endpoint
      const response = await fetch('/api/sales', {
        method: 'POST',
        body: submitData
      });
      
      if (!response.ok) {
        throw new Error('Failed to create sale');
      }
      
      // Call the parent callback with the created sale
      onSubmit({
        productId: formData.productId,
        productName: formData.productName,
        quantity: parseInt(formData.quantity),
        type: formData.type,
        note: formData.note
      });
      
      toast.success(`${formData.type === 'sale' ? 'Sale' : 'Restock'} recorded successfully`);
      onClose();
    } catch (error) {
      console.error('Failed to create transaction:', error);
      toast.error("Failed to save transaction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format products for combobox
  const productOptions = products.map(product => ({
    label: `${product.name} (In stock: ${product.quantity})`,
    value: product.id,
    data: product
  }));

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="productId">Product</Label>
        <Combobox
          options={productOptions}
          value={formData.productId ? parseInt(formData.productId) : undefined}
          onChange={handleProductChange}
          placeholder="Select a product"
          emptyText={isLoading ? "Loading products..." : "No products found."}
          disabled={isLoading || isSubmitting}
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
          onChange={(e) => handleQuantityChange(e.target.value)}
          placeholder="Enter quantity"
          className={quantityError ? "border-red-500" : ""}
          disabled={isSubmitting}
        />
        {quantityError && (
          <div className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {quantityError}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Label>Transaction Type</Label>
        <div className="flex gap-3">
          <Button
            type="button"
            variant={formData.type === 'sale' ? "default" : "outline"}
            className="flex items-center gap-2 flex-1"
            onClick={() => handleTypeChange('sale')}
            disabled={isSubmitting}
          >
            <TrendingUp className="h-4 w-4" />
            Sale
          </Button>
          <Button
            type="button"
            variant={formData.type === 'restock' ? "default" : "outline"}
            className="flex items-center gap-2 flex-1"
            onClick={() => handleTypeChange('restock')}
            disabled={isSubmitting}
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
          disabled={isSubmitting}
        />
      </div>
      
      <DrawerFooter className="px-0">
        <Button 
          type="submit" 
          onClick={handleSubmit}
          disabled={!!quantityError || isLoading || !formData.productId || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Transaction
            </>
          )}
        </Button>
        <DrawerClose asChild>
          <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </form>
  );
};
