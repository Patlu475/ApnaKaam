"use client";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Code, Info } from "lucide-react"
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useThemeStore } from '@/store/themeStore';

export function SiteHeader() {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Info className="h-5 w-5" />
                <span className="sr-only">Creator Info</span>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="w-80">
              <div className="flex justify-between space-y-1">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Creator</h4>
                  <div className="flex items-center pt-2">
                    <div className="rounded-full bg-primary/10 p-2 mr-2">
                      <Code className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">patlu475</p>
                      <p className="text-sm text-muted-foreground">Apna Kaam Founder</p>
                      <p className="text-xs text-muted-foreground mt-1">SaaS Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <Button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
