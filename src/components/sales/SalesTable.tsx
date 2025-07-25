"use client"

import React, { useState } from 'react';
import { MoreHorizontal, Package, TrendingUp } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SaleData {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  type: 'sale' | 'restock';
  note: string;
  timestamp: string;
}

interface SalesTableProps {
  data: SaleData[];
}

// Helper functions defined at the top level
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};

const getBadgeVariant = (type: string) => {
  return type === 'sale' ? "default" : "secondary";
};

const getBadgeIcon = (type: string) => {
  return type === 'sale' ? TrendingUp : Package;
};

function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      className="text-muted-foreground size-7 hover:bg-transparent"
      size="icon"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

function DraggableRow({ row }: { row: SaleData }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative" as const,
  };

  const { date, time } = formatTimestamp(row.timestamp);
  const BadgeIcon = getBadgeIcon(row.type);
  const badgeVariant = getBadgeVariant(row.type);

  return (
    <TableRow 
      ref={setNodeRef} 
      style={style} 
      className="border-b hover:bg-muted/30 transition-colors"
      {...attributes}
    >
      <TableCell className="w-10">
        <div {...listeners}>
          <DragHandle id={row.id} />
        </div>
      </TableCell>
      <TableCell className="py-3">
        <div className="font-medium">{row.productName}</div>
      </TableCell>
      <TableCell>
        <span className="font-medium">{row.quantity}</span>
      </TableCell>
      <TableCell>
        <Badge variant={badgeVariant} className="flex items-center gap-1.5 px-2">
          <BadgeIcon className="h-3.5 w-3.5 mr-1" />
          {row.type}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm text-muted-foreground">{row.note}</span>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          <div>{date}</div>
          <div className="text-muted-foreground">{time}</div>
        </div>
      </TableCell>
      <TableCell>
        <ActionDropdown itemId={row.id} />
      </TableCell>
    </TableRow>
  );
}

const ActionDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        className="flex size-8"
        size="icon"
      >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-32">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const SalesTable: React.FC<SalesTableProps> = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);
  const dataIds = data.map((item) => item.id);
  const sortableId = "sales-table";

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block">
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
                <TableHead>Product</TableHead>
                <TableHead className="w-24">Quantity</TableHead>
                <TableHead className="w-32">Type</TableHead>
                <TableHead>Note</TableHead>
                <TableHead className="w-36">Timestamp</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {data.map((item) => (
                    <DraggableRow key={item.id} row={item} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <p className="mb-2">No sales records found.</p>
                      <p className="text-muted-foreground text-sm">
                        Log your first sale or try refreshing the page.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden p-4 space-y-4">
        {data.map((item) => {
          const { date, time } = formatTimestamp(item.timestamp);
          const BadgeIcon = getBadgeIcon(item.type);
          const badgeVariant = getBadgeVariant(item.type);
          
          return (
            <div key={item.id} className="bg-background border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium">{item.productName}</h3>
                <ActionDropdown itemId={item.id} />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Quantity:</span>
                  <span className="font-medium">{item.quantity}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <Badge variant={badgeVariant} className="flex items-center gap-1.5 px-2">
                    <BadgeIcon className="h-3.5 w-3.5 mr-1" />
                    {item.type}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <div className="text-right text-sm">
                    <div>{date}</div>
                    <div className="text-muted-foreground">{time}</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
