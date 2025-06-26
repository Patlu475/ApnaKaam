"use client"
import React, { useState, useEffect } from 'react';
import { SearchBar } from '@/components/sales/SearchBar';
import { DateRangeFilter } from '@/components/sales/DateRangeFilter';
import { SalesTable } from '@/components/sales/SalesTable';
import { LogSaleButton } from '@/components/sales/LogSaleButton';
import { DataPagination } from '@/components/ui/data-pagination';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SiteHeader } from "@/components/dashboard/site-header";
import { getProducts } from '@/app/api/sales/route';
import { getSales } from '@/app/api/sales/route';
import { toast } from "sonner";
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

// Define product type
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

// Define sales record type
interface SalesRecord {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  type: 'sale' | 'restock';
  note: string;
  timestamp: string;
}

// Define DateRange type
interface DateRange {
  from: Date | null;
  to: Date | null;
}

const SalesLog = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({ from: null, to: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [salesData, setSalesData] = useState<SalesRecord[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [salesLoading, setSalesLoading] = useState(true);

  // Fetch products and sales when page loads
  useEffect(() => {
    console.log('Sales page mounted - fetching data');
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setSalesLoading(true);
        
        // Fetch products and sales in parallel
        const [productsData, salesData] = await Promise.all([
          getProducts(),
          getSales()
        ]);
        
        setProducts(productsData);
        
        // Format sales data for the table
        const formattedSales = salesData.map(sale => ({
          id: sale.id,
          productId: sale.productId,
          productName: sale.product?.name || 'Unknown Product',
          quantity: sale.quantity,
          type: sale.type,
          note: sale.note || '',
          timestamp: sale.createdAt.toISOString(),
        }));
        
        setSalesData(formattedSales);
        console.log('Sales data loaded:', formattedSales.length, 'records');
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.error("Failed to load data. Please refresh the page.");
      } finally {
        setIsLoading(false);
        setSalesLoading(false);
      }
    };

    fetchData();

    // Listen for router events to refresh data
    const handleRouteChange = () => {
      console.log('Route changed, refreshing sales data');
      fetchData();
    };

    window.addEventListener('focus', handleRouteChange);

    return () => {
      window.removeEventListener('focus', handleRouteChange);
    };
  }, []); // Empty dependency array ensures it runs only once on mount

  // Handle sale creation
  const handleSaleCreated = (saleData: SalesRecord) => {
    // Add the new sale to the beginning of the list
    setSalesData(prevSales => [saleData, ...prevSales]);

    // The quantity update is now handled on the server by the createSale action,
    // but we still need to update our local state to reflect the changes
    setProducts(prevProducts => prevProducts.map(product => {
      if (product.id === saleData.productId) {
        const quantityChange = saleData.type === 'sale' 
          ? -saleData.quantity 
          : saleData.quantity;
          
        return {
          ...product,
          quantity: product.quantity + quantityChange
        };
      }
      return product;
    }));
  };

  // Function to refetch sales data manually
  const refreshSales = async () => {
    try {
      setSalesLoading(true);
      const salesData = await getSales();

      // Format sales data for the table
      const formattedSales = salesData.map(sale => ({
        id: sale.id,
        productId: sale.productId,
        productName: sale.product?.name || 'Unknown Product',
        quantity: sale.quantity,
        type: sale.type,
        note: sale.note || '',
        timestamp: sale.createdAt.toISOString(),
      }));
      
      setSalesData(formattedSales);
      toast.success("Sales data refreshed successfully");
    } catch (error) {
      console.error('Failed to refresh sales:', error);
      toast.error("Failed to refresh sales data");
    } finally {
      setSalesLoading(false);
    }
  };

  // Hard refresh - force revalidation of data
  const hardRefresh = () => {
    console.log('Hard refreshing data...');
    router.refresh();
    refreshSales();
  };

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

  return (
    <div className="flex flex-1 flex-col">
      {/* Header with site header that includes UserButton */}
      <SiteHeader />
      
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
            <LogSaleButton products={products} onSaleCreated={handleSaleCreated} isLoading={isLoading} />
          </div>
        </div>

        {/* Sales Table */}
        <div className="px-4 lg:px-6">
          <div className="overflow-hidden rounded-lg border">
            {salesLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Loading sales data...</span>
              </div>
            ) : (
              <>
                {paginatedSales.length === 0 && salesData.length > 0 && (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">No matching sales found for your filters.</p>
                    <Button
                      variant="link" 
                      onClick={() => {
                        setSearchTerm('');
                        setDateRange({ from: null, to: null });
                      }}
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
              </>
            )}
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
            disabled={salesLoading}
            variant="outline"
            className="ml-4"
          >
            {salesLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Sales
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalesLog;
