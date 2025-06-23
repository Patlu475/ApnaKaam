"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconAlertTriangle,
  IconDashboard,
  IconPackages,
  IconSettings,
  IconShoppingCart,
  IconRobot
} from "@tabler/icons-react"

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

export function NavMain({ className, items, ...props }: NavMainProps) {
  const mainNavItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Products",
      url: "/products",
      icon: IconPackages,
    },
    {
      title: "Sales",
      url: "/sales",
      icon: IconShoppingCart,
    },
    {
      title: "Alerts",
      url: "/alerts",
      icon: IconAlertTriangle,
    },
    {
      title: "Chatbot",
      url: "/chatbot",
      icon: IconRobot,
    },
    
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
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
