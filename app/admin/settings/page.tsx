"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { 
  Moon, Sun, Monitor, Save, RotateCcw, Loader2, 
  Bell, Languages, Palette, User, 
  Settings as SettingsIcon, Mail, Lock, HardDrive, Clock, AlertTriangle,
  RotateCw
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

type Theme = "light" | "dark" | "system";
type Language = "pt-BR" | "en-US" | "es-ES";

export interface AppSettings {
  // Aparência
  theme: Theme;
  language: Language;
  fontSize: number;
  compactMode: boolean;
  
  // Notificações
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  notificationSound: boolean;
  
  // Conta
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  
  // Sistema
  autoSave: boolean;
  developerMode: boolean;
  analytics: boolean;
}

// Default settings
const DEFAULT_SETTINGS: AppSettings = {
  // Aparência
  theme: "system",
  language: "pt-BR",
  fontSize: 14,
  compactMode: false,
  
  // Notificações
  emailNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
  notificationSound: true,
  
  // Conta
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  dateFormat: "dd/MM/yyyy",
  timeFormat: "HH:mm",
  
  // Sistema
  autoSave: true,
  developerMode: false,
  analytics: true
};

// Opções de idioma suportados
const LANGUAGES = [
  { value: "pt-BR", label: "Português (Brasil)" },
  { value: "en-US", label: "English (US)" },
  { value: "es-ES", label: "Español" },
];

// Fuso horários comuns
const TIMEZONES = [
  "America/Sao_Paulo",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Australia/Sydney"
];

// Formatos de data
const DATE_FORMATS = [
  { value: "dd/MM/yyyy", label: "DD/MM/AAAA" },
  { value: "MM/dd/yyyy", label: "MM/DD/AAAA" },
  { value: "yyyy-MM-dd", label: "AAAA-MM-DD" },
  { value: "dd MMM yyyy", label: "DD MMM AAAA" },
];

// Formatos de hora
const TIME_FORMATS = [
  { value: "HH:mm", label: "24 horas" },
  { value: "hh:mm a", label: "12 horas" },
];

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("appearance");
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Carregar configurações do localStorage ao montar o componente
  useEffect(() => {
    const loadSettings = () => {
      try {
        if (typeof window === 'undefined') return;
        
        const savedSettings = localStorage.getItem("appSettings");
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings(parsedSettings);
          
          // Aplica o tema salvo
          if (parsedSettings.theme) {
            setTheme(parsedSettings.theme);
          }
          
          // Atualiza a data do último salvamento
          const savedAt = localStorage.getItem("settingsSavedAt");
          if (savedAt) {
            setLastSaved(new Date(savedAt));
          }
        }
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
        // Usa as configurações padrão em caso de erro
        setSettings(DEFAULT_SETTINGS);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [setTheme]);

  // Atualiza uma configuração específica
  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Marca que há alterações não salvas
    setHasChanges(true);
  };

  // Salva as configurações
  const saveSettings = async () => {
    setIsSaving(true);
    
    try {
      // Simula uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Salva no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem("appSettings", JSON.stringify(settings));
        const now = new Date();
        localStorage.setItem("settingsSavedAt", now.toISOString());
        setLastSaved(now);
      }
      
      // Aplica o tema após salvar
      setTheme(settings.theme);
      
      toast.success("Configurações salvas com sucesso!");
      setHasChanges(false);
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      toast.error("Erro ao salvar as configurações. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  // Redefine as configurações para os padrões
  const resetToDefaults = () => {
    if (window.confirm("Tem certeza que deseja redefinir todas as configurações para os valores padrão?")) {
      setSettings(DEFAULT_SETTINGS);
      
      // Limpa as configurações salvas
      if (typeof window !== 'undefined') {
        localStorage.removeItem("appSettings");
        localStorage.removeItem("settingsSavedAt");
      }
      
      // O tema só será aplicado quando o usuário salvar as alterações
      toast.info("Configurações redefinidas para os padrões. Não esqueça de salvar as alterações!");
      setHasChanges(true);
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
    <div className="p-6 space-y-6  mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <SettingsIcon className="h-8 w-8" />
            Configurações
          </h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências e configurações de conta
            {lastSaved && (
              <span className="text-xs ml-2 text-muted-foreground">
                (Salvo em {lastSaved.toLocaleString()})
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={resetToDefaults}
            disabled={isSaving}
            className="gap-2 flex-1 sm:flex-initial"
          >
            <RotateCw className="h-4 w-4" />
            <span className="hidden sm:inline">Redefinir Tudo</span>
          </Button>
          <Button 
            onClick={saveSettings} 
            disabled={!hasChanges || isSaving}
            className="gap-2 flex-1 sm:flex-initial"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </span>
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

        {/* Aba de Aparência */}
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
              <div className="space-y-2">
                <Label htmlFor="theme">Tema</Label>
                <p className="text-sm text-muted-foreground">
                  Escolha como o sistema deve ser exibido
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  {[
                    { value: 'light', label: 'Claro', icon: Sun },
                    { value: 'dark', label: 'Escuro', icon: Moon },
                    { value: 'system', label: 'Sistema', icon: Monitor },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateSetting('theme', value as Theme)}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                        settings.theme === value
                          ? 'border-primary bg-primary/10 dark:bg-primary/20'
                          : 'border-muted hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className="p-3 mb-2 rounded-md bg-muted">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <p className="text-sm text-muted-foreground">
                  Selecione o idioma do sistema
                </p>
                <Select
                  value={settings.language}
                  onValueChange={(value) => updateSetting('language', value as Language)}
                >
                  <SelectTrigger className="w-full sm:w-1/2">
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Selecione um idioma" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                <p className="text-sm text-muted-foreground">
                  Ajuste o tamanho da fonte do sistema
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-xs">A</span>
                  <input
                    type="range"
                    min="12"
                    max="20"
                    value={settings.fontSize}
                    onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
                    className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-base">A</span>
                  <span className="w-10 text-center text-sm font-medium">
                    {settings.fontSize}px
                  </span>
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

        {/* Aba de Notificações */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Controle como você recebe notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Notificações por E-mail</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações importantes por e-mail
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications">Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações no navegador
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">E-mails de Marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba ofertas e atualizações por e-mail
                    </p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => updateSetting('marketingEmails', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notificationSound">Som de Notificação</Label>
                    <p className="text-sm text-muted-foreground">
                      Ative para reproduzir som ao receber notificações
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

        {/* Aba de Conta */}
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

        {/* Aba de Sistema */}
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
                      Salva automaticamente as alterações feitas
                    </p>
                  </div>
                  <Switch
                    id="autoSave"
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="developerMode">Modo Desenvolvedor</Label>
                    <p className="text-sm text-muted-foreground">
                      Ative para acessar ferramentas de desenvolvedor
                    </p>
                  </div>
                  <Switch
                    id="developerMode"
                    checked={settings.developerMode}
                    onCheckedChange={(checked) => updateSetting('developerMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics">Compartilhar Dados de Uso</Label>
                    <p className="text-sm text-muted-foreground">
                      Ajude-nos a melhorar compartilhando dados anônimos de uso
                    </p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={settings.analytics}
                    onCheckedChange={(checked) => updateSetting('analytics', checked)}
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Redefinir Configurações</h3>
                  <p className="text-sm text-muted-foreground">
                    Volte todas as configurações para os valores padrão
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={resetToDefaults}
                  className="gap-2"
                >
                  <RotateCw className="h-4 w-4" />
                  Redefinir Tudo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
