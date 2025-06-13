"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  Save, RotateCcw, Loader2, Bell, 
  Languages, User, HardDrive, Clock,
  Settings as SettingsIcon, Moon, Sun, Palette
} from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/theme-context";

type Language = "pt-BR" | "en-US" | "es-ES";

export interface AppSettings {
  language: Language;
  fontSize: number;
  compactMode: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  notificationSound: boolean;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  autoSave: boolean;
  developerMode: boolean;
  analytics: boolean;
}

// Default settings
const DEFAULT_SETTINGS: AppSettings = {
  language: "pt-BR",
  fontSize: 14,
  compactMode: false,
  emailNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
  notificationSound: true,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  dateFormat: "dd/MM/yyyy",
  timeFormat: "HH:mm",
  autoSave: true,
  developerMode: false,
  analytics: true,
};

// Timezones
const TIMEZONES = [
  "America/Sao_Paulo",
  "America/New_York",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Australia/Sydney",
];

// Date formats
const DATE_FORMATS = [
  { value: "dd/MM/yyyy", label: "DD/MM/AAAA" },
  { value: "MM/dd/yyyy", label: "MM/DD/AAAA" },
  { value: "yyyy-MM-dd", label: "AAAA-MM-DD" },
  { value: "dd MMM yyyy", label: "DD MMM AAAA" },
];

// Time formats
const TIME_FORMATS = [
  { value: "HH:mm", label: "24 horas" },
  { value: "hh:mm a", label: "12 horas" },
];

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("appearance");
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { theme, toggleTheme } = useTheme();

  // Load settings
  useEffect(() => {
    const loadSettings = () => {
      try {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
          setSettings(DEFAULT_SETTINGS);
          setIsLoading(false);
          return;
        }
        
        const savedSettings = localStorage.getItem("appSettings");
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings({
            ...DEFAULT_SETTINGS,
            ...parsedSettings,
          });
          
          const savedAt = localStorage.getItem("settingsSavedAt");
          if (savedAt) {
            setLastSaved(new Date(savedAt));
          }
        } else {
          setSettings(DEFAULT_SETTINGS);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
        setSettings(DEFAULT_SETTINGS);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Update a specific setting
  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  // Save settings
  const saveSettings = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    
    try {
      localStorage.setItem('appSettings', JSON.stringify(settings));
      const now = new Date();
      localStorage.setItem('settingsSavedAt', now.toISOString());
      setLastSaved(now);
      setHasChanges(false);
      toast.success("Configurações salvas com sucesso!");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Erro ao salvar as configurações");
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default settings
  const resetToDefaults = () => {
    if (confirm("Tem certeza que deseja redefinir todas as configurações para os valores padrão?")) {
      setSettings(DEFAULT_SETTINGS);
      setHasChanges(true);
      toast.success("Configurações redefinidas para os valores padrão");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  return (
    <div className="p-6 space-y-6 mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <SettingsIcon className="h-8 w-8" />
            Configurações
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Personalize a aparência e o comportamento do sistema
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetToDefaults}
            disabled={isSaving}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Redefinir
          </Button>
          <Button 
            onClick={saveSettings} 
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar alterações
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 h-auto">
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Aparência
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Conta
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            Sistema
          </TabsTrigger>
        </TabsList>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Aparência
              </CardTitle>
              <CardDescription>
                Personalize a aparência do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                  {theme === 'light' ? (
                    <>
                      <Moon className="h-4 w-4" />
                      Modo Escuro
                    </>
                  ) : (
                    <>
                      <Sun className="h-4 w-4" />
                      Modo Claro
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value: Language) => updateSetting("language", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">A</span>
                  <Input
                    type="range"
                    min="12"
                    max="24"
                    step="1"
                    value={settings.fontSize}
                    onChange={(e) => updateSetting("fontSize", Number(e.target.value))}
                    className="w-full max-w-xs"
                  />
                  <span className="text-sm text-muted-foreground">A</span>
                  <span className="text-sm w-8 text-center">{settings.fontSize}px</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <Label htmlFor="compactMode">Modo Compacto</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduz o espaçamento para melhor visualização
                  </p>
                </div>
                <Switch
                  id="compactMode"
                  checked={settings.compactMode}
                  onCheckedChange={(checked) => updateSetting('compactMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Gerencie suas preferências de notificação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Notificações por E-mail</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber notificações importantes por e-mail
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications">Notificações do Navegador</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber notificações no navegador
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">E-mails de Marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber ofertas e atualizações por e-mail
                    </p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => updateSetting('marketingEmails', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notificationSound">Som de Notificação</Label>
                    <p className="text-sm text-muted-foreground">
                      Reproduzir som ao receber notificações
                    </p>
                  </div>
                  <Switch
                    id="notificationSound"
                    checked={settings.notificationSound}
                    onCheckedChange={(checked) => updateSetting('notificationSound', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Configurações da Conta
              </CardTitle>
              <CardDescription>
                Gerencie as configurações da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) => updateSetting('timezone', value)}
                  >
                    <SelectTrigger className="w-full sm:w-1/2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Selecione um fuso horário" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Seu fuso horário atual: {Intl.DateTimeFormat().resolvedOptions().timeZone}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Formato de Data</Label>
                    <Select
                      value={settings.dateFormat}
                      onValueChange={(value) => updateSetting('dateFormat', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um formato" />
                      </SelectTrigger>
                      <SelectContent>
                        {DATE_FORMATS.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeFormat">Formato de Hora</Label>
                    <Select
                      value={settings.timeFormat}
                      onValueChange={(value) => updateSetting('timeFormat', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um formato" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_FORMATS.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                Configurações do Sistema
              </CardTitle>
              <CardDescription>
                Configurações avançadas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoSave">Salvamento Automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Salvar alterações automaticamente
                    </p>
                  </div>
                  <Switch
                    id="autoSave"
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="developerMode">Modo Desenvolvedor</Label>
                    <p className="text-sm text-muted-foreground">
                      Ativar ferramentas de desenvolvedor
                    </p>
                  </div>
                  <Switch
                    id="developerMode"
                    checked={settings.developerMode}
                    onCheckedChange={(checked) => updateSetting('developerMode', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics">Análise de Uso</Label>
                    <p className="text-sm text-muted-foreground">
                      Compartilhar dados de uso anônimos para melhorias
                    </p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={settings.analytics}
                    onCheckedChange={(checked) => updateSetting('analytics', checked)}
                  />
                </div>
              </div>
              
              <div className="pt-6">
                <Button variant="outline" size="sm" className="text-red-500" onClick={resetToDefaults}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Redefinir todas as configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
