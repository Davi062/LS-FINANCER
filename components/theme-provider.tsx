"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Componente simplificado que aceita qualquer propriedade
export function ThemeProvider({ 
  children, 
  ...props 
}: { 
  children: React.ReactNode;
  [key: string]: any; 
}) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
