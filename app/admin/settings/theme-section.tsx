'use client';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/theme-context";

export function ThemeSection() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="theme">Tema</Label>
          <p className="text-sm text-muted-foreground">
            {theme === 'light' ? 'Tema claro ativado' : 'Tema escuro ativado'}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleTheme}
          className="gap-2"
        >
          {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
        </Button>
      </div>
    </div>
  );
}
