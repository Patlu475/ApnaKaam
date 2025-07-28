"use client"

import * as React from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavDocumentsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: {
    name: string
    url: string
    icon: React.ElementType
  }[]
}

export function NavDocuments({ className }: NavDocumentsProps) {
  // We don't need this component for our inventory app, but we'll keep it 
  // as a simple placeholder to prevent import errors
  return (
    <SidebarMenu className={className}>
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Quick Actions</span>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus className="size-4" />
          <span className="sr-only">Add new product</span>
        </Button>
      </div>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/dashboard/products/new" legacyBehavior>
            <Plus className="size-4" />
            <span>New Product</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
