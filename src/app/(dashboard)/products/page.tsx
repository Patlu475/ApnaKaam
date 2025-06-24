"use client"
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-sonner';
import { toast } from 'sonner';
import ProductsTable from '@/components/products/ProductsTable';
import AddProductSheet from '@/components/products/AddProductSheet';

// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "MacBook Pro 14-inch",
    quantity: 15,
    price: 399000,
    threshold: 10,
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    tags: ["electronics", "laptops"]
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    quantity: 3,
    price: 269000,
    threshold: 5,
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    tags: ["electronics", "phones"]
  },
  {
    id: 3,
    name: "AirPods Pro",
    quantity: 25,
    price: 54000,
    threshold: 15,
    lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    tags: ["electronics", "audio"]
  },
  {
    id: 4,
    name: "Dell Monitor 27-inch",
    quantity: 8,
    price: 75000,
    threshold: 12,
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    tags: ["electronics", "monitors"]
  },
  {
    id: 5,
    name: "Wireless Mouse",
    quantity: 50,
    price: 8500,
    threshold: 20,
    lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    tags: ["electronics", "accessories"]
  }
];

const Products = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const { toast } = useToast();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddProduct = (newProduct: any) => {
    const product = {
      ...newProduct,
      id: Math.max(...products.map(p => p.id)) + 1,
      lastUpdated: new Date()
    };
    setProducts([...products, product]);
    
    // Show success toast
    toast.success("Product Added Successfully", `${product.name} has been added to your inventory.`);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEditProduct = (id: number, updatedProduct: any) => {
    setProducts(products.map(p => 
      p.id === id 
        ? { ...p, ...updatedProduct, lastUpdated: new Date() }
        : p
    ));
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Header with sidebar trigger */}
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">Products</h1>
        </div>
      </header>
      
      <div className="@container/main flex flex-1 flex-col gap-2 p-4 lg:p-6">
        {/* Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Inventory</h1>
            <p className="text-muted-foreground mt-1">Manage your product inventory and stock levels</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            {/* Add Product Button */}
            <Button 
              onClick={() => setIsAddSheetOpen(true)}
              size="sm"
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Product</span>
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <ProductsTable 
          products={filteredProducts}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        />

        {/* Add Product Sheet */}
        <AddProductSheet
          open={isAddSheetOpen}
          onOpenChange={setIsAddSheetOpen}
          onAddProduct={handleAddProduct}
        />
      </div>
    </div>
  );
};

export default Products;
