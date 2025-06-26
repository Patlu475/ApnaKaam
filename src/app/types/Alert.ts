
export interface Alert {
  id: string;
  productName: string;
  currentQuantity: number;
  threshold: number;
  category: string;
  severity: 'critical' | 'warning' | 'info';
  lastUpdated: Date;
  sku: string;
}
