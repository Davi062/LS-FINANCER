"use client"

import * as React from "react"
import { LayoutDashboard, FileText, Settings, HelpCircle } from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const clientNavItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/client",
  },
  {
    title: "Meus Projetos",
    icon: FileText,
    href: "/client/myprojects",
  },
  {
    title: "Configurações",
    icon: Settings,
    href: "/client/settingsclient",
  },
]

interface NavLinkProps {
  item: {
    title: string
    icon: React.ElementType
    href: string
  }
}

function NavLink({ item }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === item.href
  
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <item.icon className="w-5 h-5 mr-3" />
      <span>{item.title}</span>
    </Link>
  )
}

export function ClientSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">Área do Cliente</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="space-y-1 px-3 py-2">
        {clientNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="text-sm font-medium">JD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Cliente</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
