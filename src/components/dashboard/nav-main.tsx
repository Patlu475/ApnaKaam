"use client"

import * as React from "react"
import Link from "next/link"
import {
  AlertTriangle,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Bot,
} from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


interface NavMainProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: {
    title: string
    url: string
    icon: React.ElementType
  }[]
}

export function NavMain({ className }: NavMainProps) {
  const mainNavItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      url: "/products",
      icon: Package,
    },
    {
      title: "Sales",
      url: "/sales",
      icon: ShoppingCart,
    },
    {
      title: "Alerts",
      url: "/alerts",
      icon: AlertTriangle,
    },
    {
      title: "Chatbot",
      url: "/chatbot",
      icon: Bot,
    }
  ]

  return (
    <SidebarMenu className={className}>
      <div className="px-3 py-1">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Main</span>
      </div>
      {mainNavItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url}>
              <div className="flex items-center gap-2">
                <item.icon />
                <span>{item.title}</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
