"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

export function MainContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <div className="relative flex-1">
      <div 
        className={cn(
          "fixed top-0 left-0 w-full h-16 bg-background/80 backdrop-blur-sm z-10",
          "md:hidden"
        )}
      />
      <main 
        className={cn(
          "min-h-screen w-full transition-all duration-300 ease-in-out",
          "pt-16 md:pt-0",
          isExpanded ? "md:ml-[16rem]" : "md:ml-[3rem]"
        )}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
