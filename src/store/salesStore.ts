import { create } from 'zustand';

interface SalesRecord {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  type: 'sale' | 'restock';
  note: string;
  timestamp: string;
}

interface SalesStore {
  sales: SalesRecord[];
  setSales: (sales: SalesRecord[]) => void;
  addSale: (sale: SalesRecord) => void;
  clearSales: () => void;
}

export const useSalesStore = create<SalesStore>((set) => ({
  sales: [],
  setSales: (sales) => set({ sales }),
  addSale: (sale) => set((state) => ({ sales: [sale, ...state.sales] })),
  clearSales: () => set({ sales: [] }),
})); 
