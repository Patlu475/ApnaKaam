import { create } from 'zustand';
import { Product, EditableProductFields } from '@/types';

interface ProductsStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  editProduct: (id: number, updated: EditableProductFields) => void;
  deleteProduct: (id: number) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
  editProduct: (id, updated) => set((state) => ({
    products: state.products.map((p) => (p.id === id ? { ...p, ...updated } : p)),
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((p) => p.id !== id),
  })),
})); 
