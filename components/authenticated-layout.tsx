"use client";

import { useAuth } from "@/contexts/auth-context";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar */}
        {user?.admin && (
          <div className="h-screen sticky top-0 left-0 z-20">
            <AppSidebar className="h-full border-r" />
          </div>
        )}

        {/* Conteúdo principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Cabeçalho */}
          <header className="h-16 border-b flex items-center px-6 sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-4">
              <SidebarTrigger 
                className="cursor-pointer p-2 hover:bg-accent rounded-md"
                title="Alternar menu"
              />
            </div>
          </header>

          {/* Conteúdo */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
