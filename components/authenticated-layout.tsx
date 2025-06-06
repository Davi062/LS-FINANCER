"use client";

import { useAuth } from "@/contexts/auth-context";
import { AppSidebar } from "./app-sidebar";
import { ClientSidebar } from "./client-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex flex-1 w-full">
        {/* Sidebar para Admin */}
        {user?.role === 'admin' && <AppSidebar className="" />}
        
        {/* Sidebar para Cliente */}
        {user?.role === 'client' && (
          <div className="relative">
            <ClientSidebar className="fixed left-0 top-0 z-50 h-full" />
          </div>
        )}
        
        {/* Conteúdo principal */}
        <div className={cn("flex-1", {
          '': user?.role === 'client'
        })}>
          <SidebarTrigger 
            className={cn("cursor-pointer")} 
            title="Abrir sidebar"
          />
          <div className="pt-16 px-4">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
