"use client"
import { useState, useMemo } from 'react';
import { Search, Filter, Package } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCard } from '@/components/alert/AlertCard';
import { AlertWithProduct as Alert } from '@/types';
import { SiteHeader } from "@/components/dashboard/site-header";

const mockAlerts: Alert[] = [
  {
    id: '1',
    productName: 'MacBook Pro 16"',
    currentQuantity: 2,
    threshold: 10,
    category: 'Electronics',
    severity: 'critical',
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
    sku: 'MBP-16-001'
  },
  {
    id: '2',
    productName: 'Wireless Headphones',
    currentQuantity: 5,
    threshold: 15,
    category: 'Electronics',
    severity: 'warning',
    lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000),
    sku: 'WH-BT-002'
  },
  {
    id: '3',
    productName: 'Office Chair Ergonomic',
    currentQuantity: 0,
    threshold: 8,
    category: 'Furniture',
    severity: 'critical',
    lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
    sku: 'OC-ERG-003'
  },
  {
    id: '4',
    productName: 'Smart Watch Series 9',
    currentQuantity: 8,
    threshold: 20,
    category: 'Electronics',
    severity: 'warning',
    lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000),
    sku: 'SW-S9-004'
  },
  {
    id: '5',
    productName: 'Standing Desk Electric',
    currentQuantity: 1,
    threshold: 5,
    category: 'Furniture',
    severity: 'critical',
    lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
    sku: 'SD-ELC-005'
  }
];

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredAlerts = useMemo(() => {
    return mockAlerts.filter(alert => {
      const matchesSearch = alert.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alert.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
      const matchesCategory = categoryFilter === 'all' || alert.category === categoryFilter;
      
      return matchesSearch && matchesSeverity && matchesCategory;
    });
  }, [searchTerm, severityFilter, categoryFilter]);

  const criticalCount = mockAlerts.filter(alert => alert.severity === 'critical').length;
  const warningCount = mockAlerts.filter(alert => alert.severity === 'warning').length;

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <SiteHeader />
      
      <div className="@container/main flex flex-1 flex-col pt-2">
        {/* Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-4 lg:px-6">
          <div>
            <h1 className="text-2xl font-bold">Inventory Alerts</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage low-stock products</p>
          </div>
          
          {/* Stats Cards */}
          <div className="flex gap-4">
            <div className="bg-card rounded-lg p-3 border shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-muted-foreground">Critical</span>
              </div>
              <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
            </div>
            <div className="bg-card rounded-lg p-3 border shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm font-medium text-muted-foreground">Warning</span>
              </div>
              <p className="text-2xl font-bold text-amber-600">{warningCount}</p>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row items-center gap-4 mb-6 px-4 lg:px-6">
          <div className="relative w-full lg:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex gap-3 w-full lg:w-auto">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full lg:w-[140px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-[140px]">
                <Package className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-6">
          {filteredAlerts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No alerts found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredAlerts.map((alert, index) => (
              <div
                key={alert.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AlertCard alert={alert} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
