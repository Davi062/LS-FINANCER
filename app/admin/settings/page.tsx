"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor, Save, RotateCcw, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Theme = "light" | "dark" | "system";

// Default settings
const DEFAULT_SETTINGS = {
  theme: "system" as Theme,
  notifications: true,
  autoSave: true,
  language: "pt-BR"
};

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_SETTINGS.theme);
  const [notifications, setNotifications] = useState(DEFAULT_SETTINGS.notifications);
  const [autoSave, setAutoSave] = useState(DEFAULT_SETTINGS.autoSave);
  const [language, setLanguage] = useState(DEFAULT_SETTINGS.language);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        if (typeof window === 'undefined') return;
        
        // Load settings from localStorage or use defaults
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        const savedNotifications = localStorage.getItem("notifications");
        const savedAutoSave = localStorage.getItem("autoSave");
        const savedLanguage = localStorage.getItem("language");

        if (savedTheme) setCurrentTheme(savedTheme);
        if (savedTheme) setTheme(savedTheme);
        if (savedNotifications !== null) setNotifications(savedNotifications === 'true');
        if (savedAutoSave !== null) setAutoSave(savedAutoSave === 'true');
        if (savedLanguage) setLanguage(savedLanguage);
      } catch (error) {
        console.error("Failed to load settings:", error);
        // Fallback to default settings
        setCurrentTheme(DEFAULT_SETTINGS.theme);
        setTheme(DEFAULT_SETTINGS.theme);
        setNotifications(DEFAULT_SETTINGS.notifications);
        setAutoSave(DEFAULT_SETTINGS.autoSave);
        setLanguage(DEFAULT_SETTINGS.language);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  const handleSaveSettings = () => {
    // In a real app, you would save these settings to your backend here
    if (typeof window !== 'undefined') {
      localStorage.setItem("theme", currentTheme);
      localStorage.setItem("notifications", notifications.toString());
      localStorage.setItem("autoSave", autoSave.toString());
      localStorage.setItem("language", language);
    }
    
    toast.success("Configurações salvas com sucesso!");
  };

  const resetToDefaults = () => {
    setCurrentTheme(DEFAULT_SETTINGS.theme);
    setTheme(DEFAULT_SETTINGS.theme);
    setNotifications(DEFAULT_SETTINGS.notifications);
    setAutoSave(DEFAULT_SETTINGS.autoSave);
    setLanguage(DEFAULT_SETTINGS.language);
    
    // Clear saved settings from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem("theme");
      localStorage.removeItem("notifications");
      localStorage.removeItem("autoSave");
      localStorage.removeItem("language");
    }
    
    toast.info("Configurações redefinidas para os padrões");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações da sua conta e preferências
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetToDefaults}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Redefinir
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Tema */}
        <Card>
          <CardHeader>
            <CardTitle>Tema</CardTitle>
            <CardDescription>Personalize a aparência do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="theme-selector" className="text-base">
                  Tema do Sistema
                </Label>
                <p className="text-sm text-muted-foreground">
                  Escolha como o sistema deve ser exibido
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={currentTheme === "light" ? "default" : "outline"}
                  onClick={() => handleThemeChange("light")}
                  className="flex flex-col h-auto p-3"
                >
                  <Sun className="h-5 w-5 mb-1" />
                  <span className="text-xs">Claro</span>
                </Button>
                <Button
                  variant={currentTheme === "dark" ? "default" : "outline"}
                  onClick={() => handleThemeChange("dark")}
                  className="flex flex-col h-auto p-3"
                >
                  <Moon className="h-5 w-5 mb-1" />
                  <span className="text-xs">Escuro</span>
                </Button>
                <Button
                  variant={currentTheme === "system" ? "default" : "outline"}
                  onClick={() => handleThemeChange("system")}
                  className="flex flex-col h-auto p-3"
                >
                  <Monitor className="h-5 w-5 mb-1" />
                  <span className="text-xs">Sistema</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Controle como você recebe notificações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="text-base">
                  Ativar Notificações
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações sobre atualizações importantes
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferências do Sistema */}
        <Card>
          <CardHeader>
            <CardTitle>Preferências do Sistema</CardTitle>
            <CardDescription>Configurações gerais do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-save" className="text-base">
                  Salvar automaticamente
                </Label>
                <p className="text-sm text-muted-foreground">
                  Salvar alterações automaticamente
                </p>
              </div>
              <Switch
                id="auto-save"
                checked={autoSave}
                onCheckedChange={setAutoSave}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="language" className="text-base">
                  Idioma
                </Label>
                <p className="text-sm text-muted-foreground">
                  Selecione o idioma do sistema
                </p>
              </div>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-background border rounded-md px-3 py-2 text-sm"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
