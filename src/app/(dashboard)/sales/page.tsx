"use client"
import React, { useState } from 'react';
import { SearchBar } from '@/components/sales/SearchBar';
import { DateRangeFilter } from '@/components/sales/DateRangeFilter';
import { SalesTable } from '@/components/sales/SalesTable';
import { LogSaleButton } from '@/components/sales/LogSaleButton';
import { DataPagination } from '@/components/ui/data-pagination';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

const SalesLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Mock sales data with proper typing
  const salesData = [
    {
      id: 1,
      productName: 'MacBook Pro 16"',
      quantity: 2,
      type: 'sale' as const,
      note: 'Corporate order for development team',
      timestamp: '2024-06-24 14:30:00'
    },
    {
      id: 2,
      productName: 'iPhone 15 Pro',
      quantity: 50,
      type: 'restock' as const,
      note: 'Weekly inventory replenishment',
      timestamp: '2024-06-24 09:15:00'
    },
    {
      id: 3,
      productName: 'AirPods Pro',
      quantity: 5,
      type: 'sale' as const,
      note: 'Premium customer bundle deal',
      timestamp: '2024-06-23 16:45:00'
    },
    {
      id: 4,
      productName: 'iPad Air',
      quantity: 3,
      type: 'sale' as const,
      note: 'Education sector purchase',
      timestamp: '2024-06-23 11:20:00'
    },
    {
      id: 5,
      productName: 'Apple Watch Series 9',
      quantity: 25,
      type: 'restock' as const,
      note: 'Seasonal inventory update',
      timestamp: '2024-06-22 13:10:00'
    }
  ];

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
          <h1 className="text-base font-medium">Sales</h1>
        </div>
      </header>
      
      <div className="@container/main flex flex-1 flex-col gap-2 p-4 lg:p-6">
        {/* Title and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Sales Log</h1>
            <p className="text-muted-foreground mt-1">Track and manage your inventory transactions</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <DateRangeFilter value={dateRange} onChange={setDateRange} />
            <LogSaleButton />
          </div>
        </div>

        {/* Sales Table */}
        <div className="overflow-hidden rounded-lg border">
          <SalesTable data={salesData} />
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <DataPagination 
            currentPage={currentPage}
            pageCount={3}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            showRowsPerPage={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesLog;
