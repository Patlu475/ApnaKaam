import React, { useState, useId, useEffect } from 'react';
import { ChevronDown, ChevronUp, Package, AlertTriangle, GripVertical, CheckCircle, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataPagination } from '@/components/ui/data-pagination';
import ProductActions from '@/components/products/ProductActions';

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

interface ProductsTableProps {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (id: number, product: any) => void;
  isLoading?: boolean;
}

type SortField = 'name' | 'quantity' | 'price' | 'updatedAt';
type SortDirection = 'asc' | 'desc';

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <GripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

// Create a draggable row component
function DraggableRow({ product, lowStock, formatPrice, onEdit, onDelete }: { 
  product: Product, 
  lowStock: boolean, 
  formatPrice: (price: number) => string,
  onEdit: (id: number, product: any) => void,
  onDelete: (id: number) => void
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: product.id,
  });

  return (
    <TableRow 
      ref={setNodeRef}
      data-state={isDragging && "dragging"}
      className="border-b hover:bg-muted/30 transition-colors relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      <TableCell>
        <DragHandle id={product.id} />
      </TableCell>
      <TableCell className="py-3">
        <div className="flex items-center gap-3">
          {product.imageUrl && (
            <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="font-medium">{product.name}</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {product.tags && product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-muted-foreground px-1.5">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {lowStock ? (
            <AlertTriangle className="mr-1 h-3.5 w-3.5 text-destructive" />
          ) : (
            <CheckCircle className="mr-1 h-3.5 w-3.5 text-green-500 dark:text-green-400" />
          )}
          {product.quantity}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="font-medium">
          {formatPrice(product.price)}
        </span>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {lowStock && <AlertTriangle className="mr-1 h-3.5 w-3.5 text-destructive" />}
          {product.lowStockThreshold}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(product.updatedAt), { addSuffix: true })}
        </span>
      </TableCell>
      <TableCell>
        <ProductActions 
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products, onDelete, onEdit, isLoading = false }) => {
  const [productItems, setProductItems] = useState([...products]);
  const [sortField, setSortField] = useState<SortField>('updatedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const sortableId = useId();
  
  // Update local state when products change
  useEffect(() => {
    setProductItems(products);
  }, [products]);
  
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const productIds = React.useMemo<UniqueIdentifier[]>(
    () => productItems?.map(({ id }) => id) || [],
    [productItems]
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...productItems].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'updatedAt') {
      aValue = new Date(aValue as Date).getTime();
      bValue = new Date(bValue as Date).getTime();
    }
    
    if (sortField === 'name') {
      aValue = (aValue as string).toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Apply pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
  const pageCount = Math.ceil(sortedProducts.length / pageSize);

  const formatPrice = (price: number) => {
    return `Rs.${price.toLocaleString()}`;
  };

  const isLowStock = (quantity: number, threshold: number) => {
    return quantity <= threshold;
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setProductItems((items) => {
        const oldIndex = productIds.indexOf(active.id);
        const newIndex = productIds.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  if (isLoading) {
    return (
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-medium mb-2">Loading products...</h3>
          <p className="text-muted-foreground">Please wait while we fetch your inventory data.</p>
        </div>
      </Card>
    );
  }

  if (products.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground">Get started by adding your first product to track inventory.</p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Product Name
                    <SortIcon field="name" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/80 transition-colors w-24"
                  onClick={() => handleSort('quantity')}
                >
                  <div className="flex items-center gap-2">
                    Quantity
                    <SortIcon field="quantity" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/80 transition-colors w-32"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center gap-2">
                    Price
                    <SortIcon field="price" />
                  </div>
                </TableHead>
                <TableHead className="w-28">Threshold</TableHead>
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/80 transition-colors w-36"
                  onClick={() => handleSort('updatedAt')}
                >
                  <div className="flex items-center gap-2">
                    Last Updated
                    <SortIcon field="updatedAt" />
                  </div>
                </TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              <SortableContext
                items={productIds}
                strategy={verticalListSortingStrategy}
              >
                {paginatedProducts.map((product) => {
                  const lowStock = isLowStock(product.quantity, product.lowStockThreshold);
                  return (
                    <DraggableRow 
                      key={product.id}
                      product={product}
                      lowStock={lowStock}
                      formatPrice={formatPrice}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  );
                })}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <DataPagination
          currentPage={currentPage}
          pageCount={pageCount}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          showRowsPerPage={true}
          totalCount={sortedProducts.length}
        />
      )}
    </div>
  );
};

export default ProductsTable;
