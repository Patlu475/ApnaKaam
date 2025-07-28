"use client";
import React, { useEffect, useState } from 'react';
import { SearchBar } from '@/components/sales/SearchBar';
import { DateRangeFilter } from '@/components/sales/DateRangeFilter';
import { SalesTable } from '@/components/sales/SalesTable';
import { LogSaleButton } from '@/components/sales/LogSaleButton';
import { DataPagination } from '@/components/ui/data-pagination';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSalesStore } from '@/store/salesStore';
import { Product, SaleRecord, DateRange } from '@/types';

interface SalesClientProps {
  initialProducts: Product[];
  initialSales: SaleRecord[];
}

const SalesClient: React.FC<SalesClientProps> = ({ initialProducts, initialSales }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({ from: null, to: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const salesData = useSalesStore((state) => state.sales);
  const setSales = useSalesStore((state) => state.setSales);
  const addSale = useSalesStore((state) => state.addSale);
  const clearSales = useSalesStore((state) => state.clearSales);

  useEffect(() => {
    setSales(initialSales);
  }, [initialSales, setSales]);

  // Filter sales data based on search term and date range
  const filteredSales = salesData.filter(sale => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.note.toLowerCase().includes(searchTerm.toLowerCase());
    // Filter by date range if set
    let matchesDate = true;
    if (dateRange.from || dateRange.to) {
      const saleDate = new Date(sale.timestamp);
      if (dateRange.from) {
        matchesDate = matchesDate && saleDate >= dateRange.from;
      }
      if (dateRange.to) {
        // Set to end of day for the to date
        const toDateEnd = new Date(dateRange.to);
        toDateEnd.setHours(23, 59, 59, 999);
        matchesDate = matchesDate && saleDate <= toDateEnd;
      }
    }
    return matchesSearch && matchesDate;
  });

  // Calculate pagination
  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle sale creation (add to state)
  const handleSaleCreated = (saleData: SaleRecord) => {
    addSale(saleData);
    // Optionally update products state if needed
  };

  // Hard refresh (reset filters and clear sales)
  const hardRefresh = () => {
    setSearchTerm('');
    setDateRange({ from: null, to: null });
    setCurrentPage(1);
    clearSales();
  };

  return (
    <div className="@container/main flex flex-1 flex-col pt-2">
      {/* Title and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-4 lg:px-6">
        <div>
          <h1 className="text-2xl font-bold">Sales Log</h1>
          <p className="text-muted-foreground mt-1">Track and manage your inventory transactions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <DateRangeFilter value={dateRange} onChange={setDateRange} />
          <LogSaleButton products={products} onSaleCreated={handleSaleCreated} isLoading={false} />
        </div>
      </div>
      {/* Sales Table */}
      <div className="px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          {paginatedSales.length === 0 && salesData.length > 0 && (
            <div className="text-center p-8">
              <p className="text-muted-foreground">No matching sales found for your filters.</p>
              <Button
                variant="link" 
                onClick={hardRefresh}
              >
                Clear filters
              </Button>
            </div>
          )}
          {salesData.length === 0 && (
            <div className="text-center p-8">
              <p className="text-muted-foreground mb-2">No sales records found.</p>
              <Button onClick={hardRefresh} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          )}
          {paginatedSales.length > 0 && <SalesTable data={paginatedSales} />}
        </div>
      </div>
      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center px-4 lg:px-6">
        <DataPagination 
          currentPage={currentPage}
          pageCount={Math.max(1, Math.ceil(filteredSales.length / pageSize))}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          showRowsPerPage={true}
        />
        <Button 
          onClick={hardRefresh} 
          variant="outline"
          className="ml-4"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Sales
        </Button>
      </div>
    </div>
  );
};

export default SalesClient; 
