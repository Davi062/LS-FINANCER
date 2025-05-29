"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from "@/lib/utils";

// Import AppSidebar with default export
const AppSidebar = dynamic(
  () => import('@/components/app-sidebar'),
  { 
    ssr: false, 
    loading: () => null 
  }
);

// Import SidebarTrigger as a named export
const SidebarTrigger = dynamic(
  () => import('@/components/ui/sidebar').then((mod) => mod.SidebarTrigger),
  { 
    ssr: false, 
    loading: () => null 
  }
);

export function SidebarClient() {
  const { isMobile, open } = useSidebar();
  
  // Ajusta a posição do trigger baseado no estado da sidebar
  const triggerClass = cn(
    'fixed top-4 z-50 transition-all duration-300',
    {
      'left-4': isMobile || !open,
      'left-[370px]': !isMobile && open
    }
  );

  return (
    <>
      <SidebarTrigger className={triggerClass} />
      <AppSidebar />
    </>
  );
}
