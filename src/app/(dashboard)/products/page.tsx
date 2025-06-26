"use client"
import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-sonner';
import ProductsTable from '@/components/products/ProductsTable';
import AddProductSheet from '@/components/products/AddProductSheet';
import { SiteHeader } from "@/components/dashboard/site-header";
import { getProducts } from '@/app/api/products/route';

// Define type for product
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

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error('Error', 'Failed to load products. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleAddProduct = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEditProduct = (id: number, updatedProduct: any) => {
    setProducts(products.map(p => 
      p.id === id 
        ? { ...p, ...updatedProduct }
        : p
    ));
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Header with site header that includes UserButton */}
      <SiteHeader />
      
      <div className="@container/main flex flex-1 flex-col pt-2">
        {/* Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-4 lg:px-6">
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
        <div className="px-4 lg:px-6">
          <ProductsTable 
            products={filteredProducts}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
            isLoading={isLoading}
          />
        </div>

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
