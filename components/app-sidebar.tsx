"use client"

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import dynamic from 'next/dynamic'

const Sidebar = dynamic(() => import('@/components/ui/sidebar').then(mod => mod.Sidebar), { ssr: false })
const SidebarContent = dynamic(() => import('@/components/ui/sidebar').then(mod => mod.SidebarContent), { ssr: false })
const SidebarGroup = dynamic(() => import('@/components/ui/sidebar').then(mod => mod.SidebarGroup), { ssr: false })
const SidebarGroupContent = dynamic(() => import('@/components/ui/sidebar').then(mod => mod.SidebarGroupContent), { ssr: false })
const SidebarGroupLabel = dynamic(() => import('@/components/ui/sidebar').then(mod => mod.SidebarGroupLabel), { ssr: false })
const SidebarMenu = dynamic(() => import('@/components/ui/sidebar').then(mod => mod.SidebarMenu), { ssr: false })
const SidebarMenuButton = dynamic(() => import('@/components/ui/sidebar').then(mod => mod.SidebarMenuButton), { ssr: false })
const SidebarMenuItem = dynamic(() => import('@/components/ui/sidebar').then(mod => mod.SidebarMenuItem), { ssr: false })
const useSidebar = () => {
  if (typeof window === 'undefined') return { isMobile: false }
  return require('@/components/ui/sidebar').useSidebar()
}
import { cn } from "@/lib/utils"

// Menu items.
const items = [
  {
    title: "Dash",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

function AppSidebar() {
  const { isMobile } = useSidebar()

  return (
    <Sidebar 
      className={cn(
        "shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] flex flex-col bg-background",
        isMobile 
          ? "fixed top-0 left-0 right-0 h-auto max-h-[80vh] overflow-y-auto z-40" 
          : "w-[350px] h-full border-r z-30"
      )}
      side={isMobile ? "top" : "left"}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-center">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="hover:bg-transparent w-full" key={item.title}>
                  <SidebarMenuButton className="hover:bg-transparent w-full" asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar;
