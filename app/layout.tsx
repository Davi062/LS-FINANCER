'use client';

import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/auth-context";
import { AppSidebar } from "@/components/app-sidebar";
import { ClientSidebar } from "@/components/client-sidebar";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// This component handles the layout based on authentication state
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect logic based on authentication
  useEffect(() => {
    if (isLoading) return;
    
    // If not logged in and not on login page, redirect to login
    if (!user && !pathname.startsWith('/login')) {
      router.push('/login');
    }
    // If logged in and on login page, redirect to appropriate dashboard
    else if (user && pathname.startsWith('/login')) {
      const redirectPath = user.role === 'admin' ? '/admin' : '/client/dashboard';
      router.push(redirectPath);
    }
  }, [user, isLoading, pathname, router]);

  // Show loading state while checking auth
  if (isLoading || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Determine which sidebar to show based on user role
  const SidebarComponent = user?.role === 'admin' ? AppSidebar : ClientSidebar;
  const showSidebar = user && !['/login', '/register'].includes(pathname);

  return (
    <>
      {showSidebar && (
        <>
          <SidebarTrigger className="cursor-pointer fixed left-4 top-4 z-50" />
          <SidebarComponent />
        </>
      )}
      <div className={`flex-1 w-full ${showSidebar ? 'pl-16' : ''}`}>
        {children}
      </div>
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="h-full">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased h-full flex",
          inter.className,
          inter.variable
        )}
      >
        <AuthProvider>
          <SidebarProvider>
            <LayoutContent>
              {children}
            </LayoutContent>
            <Toaster position="top-right" richColors />
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
