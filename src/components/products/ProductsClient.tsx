"use client";
import React, { useEffect, useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductsTable from '@/components/products/ProductsTable';
import AddProductSheet from '@/components/products/AddProductSheet';
import { useToast } from '@/hooks/use-sonner';
import { useProductsStore } from '@/store/productsStore';

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

interface ProductsClientProps {
  initialProducts: Product[];
}

const ProductsClient: React.FC<ProductsClientProps> = ({ initialProducts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const { toast } = useToast();
  const products = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);
  const addProduct = useProductsStore((state) => state.addProduct);
  const editProduct = useProductsStore((state) => state.editProduct);
  const deleteProduct = useProductsStore((state) => state.deleteProduct);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts, setProducts]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleAddProduct = (newProduct: Product) => {
    addProduct(newProduct);
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
  };

  const handleEditProduct = (id: number, updatedProduct: any) => {
    editProduct(id, updatedProduct);
  };

  return (
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
          isLoading={false}
        />
      </div>
      {/* Add Product Sheet */}
      <AddProductSheet
        open={isAddSheetOpen}
        onOpenChange={setIsAddSheetOpen}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default ProductsClient; 