"use client"

import React, { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { X } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';
import { Textarea } from '@/components/ui/textarea';

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  cost?: number;
  lowStockThreshold: number;
  tags: string[];
  imageUrl?: string | null;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Type for editable product fields (excluding system fields)
type EditableProductFields = Pick<Product, 'name' | 'quantity' | 'price' | 'lowStockThreshold' | 'tags' | 'imageUrl' | 'description'> & {
  cost?: number;
};

interface EditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  onEditProduct: (product: EditableProductFields) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ 
  open, 
  onOpenChange, 
  product,
  onEditProduct 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    cost: '',
    threshold: '',
    description: '',
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        quantity: product.quantity.toString(),
        price: product.price.toString(),
        cost: product.cost?.toString() || '',
        threshold: product.lowStockThreshold.toString(),
        description: product.description || '',
      });
      setTags(product.tags || []);
      setImageUrl(product.imageUrl || null);
    }
  }, [product]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!formData.name || !formData.quantity || !formData.price || !formData.threshold) {
    }

    onEditProduct({
      name: formData.name,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      cost: formData.cost ? parseFloat(formData.cost) : undefined,
      lowStockThreshold: parseInt(formData.threshold),
      tags: tags,
      imageUrl: imageUrl,
      description: formData.description || undefined,
    });
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction={isMobile ? "bottom" : "right"}>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Edit Product</DrawerTitle>
          <DrawerDescription>
            Make changes to the product information
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="flex flex-col gap-3">
              <Label>Product Image</Label>
              <ImageUpload onImageChange={setImageUrl} />
              {imageUrl && <input type="hidden" value={imageUrl} />}
            </div>

            <Separator />
            
            <div className="flex flex-col gap-3">
              <Label htmlFor="edit-name">Product Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="edit-quantity">Quantity</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="edit-threshold">Threshold</Label>
                <Input
                  id="edit-threshold"
                  type="number"
                  value={formData.threshold}
                  onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="edit-price">Price (PKR)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="edit-cost">Cost (PKR)</Label>
                <Input
                  id="edit-cost"
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description (optional)"
                className="resize-none"
                rows={3}
              />
            </div>
            
            <Separator />

            <div className="flex flex-col gap-3">
              <Label htmlFor="edit-tags">Tags</Label>
              <Input
                id="edit-tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tags (press Enter or comma to add)"
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-muted-foreground px-1.5 flex items-center gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>
        
        <DrawerFooter>
          <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProductDialog;
