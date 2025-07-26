// Shared types for sales components

export interface Product {
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

// Form data for creating a sale (what the form sends)
export interface SaleFormData {
  productId: string;
  productName: string;
  quantity: number;
  type: 'sale' | 'restock';
  note?: string;
}

// Complete sale record returned from API
export interface SaleRecord {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  type: 'sale' | 'restock';
  note: string;
  timestamp: string;
}

// Date range for filtering
export interface DateRange {
  from: Date | null;
  to: Date | null;
} 