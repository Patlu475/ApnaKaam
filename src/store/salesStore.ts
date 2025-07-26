import { create } from 'zustand';
import { SaleRecord } from '@/types/sales';

interface SalesStore {
  sales: SaleRecord[];
  setSales: (sales: SaleRecord[]) => void;
  addSale: (sale: SaleRecord) => void;
  clearSales: () => void;
}

export const useSalesStore = create<SalesStore>((set) => ({
  sales: [],
  setSales: (sales) => set({ sales }),
  addSale: (sale) => set((state) => ({ sales: [sale, ...state.sales] })),
  clearSales: () => set({ sales: [] }),
})); 
