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
  primaryColor: string; // Nova propriedade para a cor personalizada
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
  primaryColor: "#3b82f6", // Cor azul padrão
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

  // Aplicar a cor personalizada ao tema
  const applyCustomColor = (color: string | undefined) => {
    if (!color) return;
    
    try {
      // Remove a classe de cor anterior, se existir
      const existingStyle = document.getElementById('custom-theme-color');
      
      // Cria uma nova tag de estilo com a cor personalizada
      const style = document.createElement('style');
      style.id = 'custom-theme-color';
      
      const hoverColor = adjustColor(color, -10);
      const activeColor = adjustColor(color, -20);
      
      style.textContent = `
        :root {
          --primary: ${color};
          --primary-foreground: #ffffff;
          --primary-hover: ${hoverColor};
          --primary-active: ${activeColor};
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

  // Função auxiliar para ajustar o brilho de uma cor
  const adjustColor = (color: string, amount: number): string => {
    if (!color) return '#3b82f6'; // Cor padrão se não houver cor
    
    try {
      // Remove o # do início, se existir
      const hex = color.replace('#', '');
      
      // Verifica se o valor hexadecimal é válido
      if (!/^[0-9A-Fa-f]{6}$/i.test(hex)) {
        return '#3b82f6'; // Retorna cor padrão se o formato for inválido
      }
      
      // Converte para valores RGB
      const r = Math.max(0, Math.min(255, parseInt(hex.substring(0, 2), 16) + amount));
      const g = Math.max(0, Math.min(255, parseInt(hex.substring(2, 4), 16) + amount));
      const b = Math.max(0, Math.min(255, parseInt(hex.substring(4, 6), 16) + amount));
      
      // Converte de volta para hexadecimal
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    } catch (error) {
      console.error('Erro ao ajustar cor:', error);
      return '#3b82f6'; // Retorna cor padrão em caso de erro
    }
  };

  // Aplicar o tema e a cor personalizada quando as configurações forem carregadas ou alteradas
  useEffect(() => {
    if (isLoading || typeof document === 'undefined') return;
    
    try {
      // Aplica o tema
      const themeToApply = settings?.theme || 'system';
      setTheme(themeToApply);
      
      // Aplica a cor personalizada
      const colorToApply = settings?.primaryColor || '#3b82f6';
      applyCustomColor(colorToApply);
      
      // Atualiza a classe do documento para o tema
      if (themeToApply === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (themeToApply === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        // Tema do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    } catch (error) {
      console.error('Erro ao aplicar tema e cor:', error);
    }
  }, [settings?.primaryColor, settings?.theme, isLoading, setTheme]);

  // Carregar configurações do localStorage ao montar o componente
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
          
          // Valida e mescla com as configurações padrão
          const validatedSettings: AppSettings = {
            ...DEFAULT_SETTINGS,
            ...parsedSettings,
            // Garante que os valores obrigatórios existam
            theme: ['light', 'dark', 'system'].includes(parsedSettings.theme) 
              ? parsedSettings.theme 
              : DEFAULT_SETTINGS.theme,
            primaryColor: parsedSettings.primaryColor || DEFAULT_SETTINGS.primaryColor,
          };
          
          setSettings(validatedSettings);
          
          // Atualiza a data do último salvamento
          const savedAt = localStorage.getItem("settingsSavedAt");
          if (savedAt) {
            setLastSaved(new Date(savedAt));
          }
        } else {
          // Usa as configurações padrão se não houver configurações salvas
          setSettings(DEFAULT_SETTINGS);
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
    if (isSaving) return;
    
    setIsSaving(true);
    
    try {
      // Valida as configurações antes de salvar
      const settingsToSave: AppSettings = {
        ...DEFAULT_SETTINGS,
        ...settings,
        // Garante que o tema seja válido
        theme: ['light', 'dark', 'system'].includes(settings.theme) 
          ? settings.theme 
          : DEFAULT_SETTINGS.theme,
        // Garante que a cor seja válida
        primaryColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(settings.primaryColor)
          ? settings.primaryColor
          : DEFAULT_SETTINGS.primaryColor,
      };
      
      // Atualiza o estado com as configurações validadas
      setSettings(settingsToSave);
      
      // Simula uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Salva no localStorage
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem("appSettings", JSON.stringify(settingsToSave));
          const now = new Date();
          localStorage.setItem("settingsSavedAt", now.toISOString());
          setLastSaved(now);
        } catch (storageError) {
          console.error("Erro ao acessar o localStorage:", storageError);
          toast.error("Não foi possível salvar as configurações localmente.");
          return;
        }
      }
      
      // Aplica o tema e a cor personalizada após salvar
      setTheme(settingsToSave.theme);
      applyCustomColor(settingsToSave.primaryColor);
      
      // Força a atualização do tema no documento
      try {
        if (settingsToSave.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (settingsToSave.theme === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
          // Tema do sistema
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      } catch (themeError) {
        console.error("Erro ao aplicar o tema:", themeError);
      }
      
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
      // Aplica as configurações padrão
      setSettings(DEFAULT_SETTINGS);
      
      // Aplica o tema e a cor padrão imediatamente
      setTheme(DEFAULT_SETTINGS.theme);
      applyCustomColor(DEFAULT_SETTINGS.primaryColor);
      
      // Limpa as configurações salvas
      if (typeof window !== 'undefined') {
        localStorage.removeItem("appSettings");
        localStorage.removeItem("settingsSavedAt");
      }
      
      // Força a atualização do tema no documento
      if (DEFAULT_SETTINGS.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (DEFAULT_SETTINGS.theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        // Tema do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      
      toast.success("Configurações redefinidas para os valores padrão!");
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
                <Label htmlFor="primaryColor">Cor Principal</Label>
                <p className="text-sm text-muted-foreground">
                  Escolha uma cor personalizada para o tema
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    id="primaryColor"
                    value={settings.primaryColor}
                    onChange={(e) => updateSetting('primaryColor', e.target.value)}
                    className="h-10 w-16 cursor-pointer rounded-md border border-input bg-background"
                  />
                  <span className="text-sm text-muted-foreground">
                    {settings?.primaryColor?.toUpperCase() || '#3b82f6'.toUpperCase()}
                  </span>
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
