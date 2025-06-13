"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"
import { useEffect, useState } from 'react';

// Contexto para o tema personalizado
const ThemeContext = React.createContext({
  primaryColor: '#3b82f6',
  setPrimaryColor: (color: string) => {},
  applyCustomColor: (color: string) => {}
});

// Hook personalizado para usar o tema
export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Provedor de tema personalizado
export function ThemeProvider({ 
  children, 
  ...props 
}: { 
  children: React.ReactNode;
  [key: string]: any; 
}) {
  const [primaryColor, setPrimaryColorState] = useState<string>('#3b82f6');
  const { resolvedTheme } = useNextTheme();

  // Carrega a cor salva ao iniciar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('themeSettings');
      if (savedSettings) {
        try {
          const { primaryColor: savedColor } = JSON.parse(savedSettings);
          if (savedColor) {
            setPrimaryColorState(savedColor);
            applyCustomColor(savedColor);
          }
        } catch (error) {
          console.error('Failed to load theme settings', error);
        }
      }
    }
  }, []);

  // Aplica a cor personalizada
  const applyCustomColor = (color: string) => {
    if (!color || typeof document === 'undefined') return;

    try {
      // Remove a classe de cor anterior, se existir
      const existingStyle = document.getElementById('custom-theme-color');
      
      // Cria uma nova tag de estilo com a cor personalizada
      const style = document.createElement('style');
      style.id = 'custom-theme-color';
      
      // Função para ajustar o brilho de uma cor
      const adjustColor = (color: string, amount: number): string => {
        if (!color) return color;
        
        try {
          const hex = color.replace('#', '');
          if (!/^[0-9A-Fa-f]{6}$/i.test(hex)) return color;
          
          let r = parseInt(hex.substring(0, 2), 16);
          let g = parseInt(hex.substring(2, 4), 16);
          let b = parseInt(hex.substring(4, 6), 16);
          
          r = Math.max(0, Math.min(255, r + amount));
          g = Math.max(0, Math.min(255, g + amount));
          b = Math.max(0, Math.min(255, b + amount));
          
          return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        } catch (error) {
          console.error('Erro ao ajustar cor:', error);
          return color;
        }
      };

      const hoverColor = adjustColor(color, -10);
      const activeColor = adjustColor(color, -20);
      
      style.textContent = `
        :root {
          --primary: ${color} !important;
          --primary-foreground: #ffffff !important;
          --primary-hover: ${hoverColor} !important;
          --primary-active: ${activeColor} !important;
        }
        
        .dark {
          --primary: ${color} !important;
          --primary-foreground: #ffffff !important;
          --primary-hover: ${hoverColor} !important;
          --primary-active: ${activeColor} !important;
        }
      `;
      
      // Remove o estilo antigo e adiciona o novo
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
      
      if (document.head) {
        document.head.appendChild(style);
      }
    } catch (error) {
      console.error('Erro ao aplicar cor personalizada:', error);
    }
  };

  // Atualiza a cor quando ela mudar
  const setPrimaryColor = (color: string) => {
    if (!color) return;
    
    setPrimaryColorState(color);
    applyCustomColor(color);
    
    // Salva no localStorage
    if (typeof window !== 'undefined') {
      const settings = {
        theme: resolvedTheme,
        primaryColor: color
      };
      localStorage.setItem('themeSettings', JSON.stringify(settings));
    }
  };

  return (
    <NextThemesProvider {...props}>
      <ThemeContext.Provider value={{ primaryColor, setPrimaryColor, applyCustomColor }}>
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  );
}
