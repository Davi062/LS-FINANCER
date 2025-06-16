"use client";

import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, DollarSign, FileText, Mail, Phone, Plus, Search, User, X, Save } from "lucide-react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ProjectStatus = 'Em andamento' | 'Concluído' | 'Orçamento' | 'Atrasado' | 'Pendente';

interface Project {
  id: number;
  client: {
    name: string;
    email: string;
    phone: string;
  };
  title: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: number;
  progress: number;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  notes: string;
  createdAt: string;
}

const projects: Project[] = [
  {
    id: 1,
    client: {
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(11) 98765-4321'
    },
    title: 'Site Institucional',
    description: 'Desenvolvimento de site institucional responsivo com painel administrativo e blog integrado.',
    status: 'Em andamento',
    startDate: '2025-05-15',
    endDate: '2025-07-15',
    budget: 5000,
    progress: 65,
    items: [
      { description: 'Desenvolvimento do layout', quantity: 1, unitPrice: 2000, total: 2000 },
      { description: 'Integração com CMS', quantity: 1, unitPrice: 1500, total: 1500 },
      { description: 'Otimização SEO', quantity: 1, unitPrice: 1000, total: 1000 },
      { description: 'Treinamento', quantity: 2, unitPrice: 250, total: 500 },
    ],
    notes: 'Cliente solicitou alterações no layout da página inicial.',
    createdAt: '2025-05-10'
  },
  {
    id: 2,
    client: {
      name: 'Maria Santos',
      email: 'maria@example.com',
      phone: '(21) 99876-5432'
    },
    title: 'Loja Virtual',
    description: 'E-commerce completo com integração de pagamentos, frete e gestão de estoque.',
    status: 'Concluído',
    startDate: '2025-04-10',
    endDate: '2025-05-30',
    budget: 12000,
    progress: 100,
    items: [
      { description: 'Desenvolvimento da loja', quantity: 1, unitPrice: 8000, total: 8000 },
      { description: 'Integração com gateway de pagamento', quantity: 1, unitPrice: 2000, total: 2000 },
      { description: 'Configuração de frete', quantity: 1, unitPrice: 1000, total: 1000 },
      { description: 'Treinamento', quantity: 3, unitPrice: 333.33, total: 1000 },
    ],
    notes: 'Cliente satisfeito com o resultado final.',
    createdAt: '2025-04-05'
  },
  {
    id: 3,
    client: {
      name: 'Carlos Oliveira',
      email: 'carlos@example.com',
      phone: '(31) 98765-1234'
    },
    title: 'Aplicativo Móvel',
    description: 'Aplicativo iOS e Android com backend em nuvem e sincronização em tempo real.',
    status: 'Atrasado',
    startDate: '2025-06-01',
    endDate: '2025-09-30',
    budget: 25000,
    progress: 30,
    items: [
      { description: 'Desenvolvimento do app', quantity: 1, unitPrice: 15000, total: 15000 },
      { description: 'Backend em nuvem', quantity: 1, unitPrice: 7000, total: 7000 },
      { description: 'Publicação nas lojas', quantity: 1, unitPrice: 3000, total: 3000 },
    ],
    notes: 'Aguardando aprovação do cliente para continuar com o desenvolvimento.',
    createdAt: '2025-05-20'
  },
  {
    id: 4,
    client: {
      name: 'Ana Costa',
      email: 'ana@example.com',
      phone: '(51) 98765-5678'
    },
    title: 'Landing Page',
    description: 'Página de captura para lançamento de novo produto com formulário de contato e integração com email marketing.',
    status: 'Orçamento',
    startDate: '',
    endDate: '',
    budget: 3000,
    progress: 0,
    items: [
      { description: 'Desenvolvimento da landing page', quantity: 1, unitPrice: 2000, total: 2000 },
      { description: 'Formulário de captura', quantity: 1, unitPrice: 500, total: 500 },
      { description: 'Integração com email marketing', quantity: 1, unitPrice: 500, total: 500 },
    ],
    notes: 'Aguardando aprovação do orçamento.',
    createdAt: '2025-06-01'
  }
];

const getStatusBadge = (status: ProjectStatus) => {
  const statusMap = {
    'Em andamento': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    'Concluído': 'bg-green-100 text-green-800 hover:bg-green-200',
    'Atrasado': 'bg-red-100 text-red-800 hover:bg-red-200',
    'Orçamento': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    'Pendente': 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  };
  return statusMap[status] || 'bg-gray-100 text-gray-800';
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};



export default function ProjetosPage() {
  const [projectsState, setProjectsState] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [editedProgress, setEditedProgress] = useState(0);
  
  // Estado para o formulário de novo projeto
  const [newProject, setNewProject] = useState<{
    client: {
      name: string;
      email: string;
      phone: string;
    };
    title: string;
    description: string;
    status: ProjectStatus;
    startDate: Date | undefined;
    endDate: Date | undefined;
    budget: string;
    items: Array<{
      description: string;
      quantity: string;
      unitPrice: string;
      total: string;
    }>;
    notes: string;
  }>({
    client: {
      name: '',
      email: '',
      phone: ''
    },
    title: '',
    description: '',
    status: 'Orçamento' as ProjectStatus,
    startDate: undefined,
    endDate: undefined,
    budget: '',
    items: [{ description: '', quantity: '1', unitPrice: '', total: '0' }],
    notes: ''
  });

  // Funções para manipular o formulário
  const handleAddItem = () => {
    setNewProject(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: '1', unitPrice: '', total: '0' }]
    }));
  };

  const handleRemoveItem = (index: number) => {
    if (newProject.items.length > 1) {
      setNewProject(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const handleItemChange = (index: number, field: 'description' | 'quantity' | 'unitPrice', value: string) => {
    const newItems = [...newProject.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Calcular total se quantidade ou preço unitário mudar
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = parseFloat(newItems[index].quantity) || 0;
      const unitPrice = parseFloat(newItems[index].unitPrice) || 0;
      newItems[index].total = (quantity * unitPrice).toFixed(2);
    }
    
    setNewProject(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar o novo projeto
    console.log('Novo projeto:', newProject);
    // Fechar o diálogo e limpar o formulário
    setIsNewProjectDialogOpen(false);
    // Limpar o formulário
    setNewProject({
      client: { name: '', email: '', phone: '' },
      title: '',
      description: '',
      status: 'Orçamento',
      startDate: new Date(),
      endDate: undefined,
      budget: '',
      items: [{ description: '', quantity: '1', unitPrice: '', total: '0' }],
      notes: ''
    });
  };

  // Get unique client names
  const clientNames = Array.from(new Set(projectsState.map(project => project.client.name)));

  // Filter projects based on selected client
  const filteredProjects = selectedClient 
    ? projectsState.filter(project => project.client.name === selectedClient)
    : projectsState;

  const handleClientSelect = (clientName: string) => {
    setSelectedClient(clientName === selectedClient ? '' : clientName);
  };

  const updateProjectNotes = (projectId: number, notes: string) => {
    setProjectsState(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, notes }
          : project
      )
    );
    
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject(prev => prev ? { ...prev, notes } : null);
    }
  };

  const updateProjectStatus = (projectId: number, status: ProjectStatus) => {
    setProjectsState(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, status }
          : project
      )
    );
    
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleProgressClick = () => {
    if (selectedProject) {
      setEditedProgress(selectedProject.progress);
      setIsEditingProgress(true);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10) || 0;
    value = Math.min(100, Math.max(0, value)); // Ensure value is between 0-100
    setEditedProgress(value);
  };

  const saveProgress = () => {
    if (selectedProject) {
      const projectId = selectedProject.id;
      setProjectsState(prevProjects => 
        prevProjects.map(project => 
          project.id === projectId 
            ? { ...project, progress: editedProgress }
            : project
        )
      );
      
      setSelectedProject(prev => prev ? { ...prev, progress: editedProgress } : null);
      setIsEditingProgress(false);
    }
  };

  const handleProgressKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveProgress();
    } else if (e.key === 'Escape') {
      setIsEditingProgress(false);
    }
  };

  const openProjectDetails = (project: Project, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6 lg:pr-96">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
          <p className="text-muted-foreground">Gerencie todos os seus projetos em um só lugar</p>
        </div>
        <div className="w-full md:w-auto">
          <Button
            variant="outline"
            className="w-full md:w-auto"
            onClick={() => setIsNewProjectDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Projeto
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={(e) => openProjectDetails(project, e)}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="mt-1">{project.client.name}</CardDescription>
                </div>
                <Badge className={getStatusBadge(project.status)}>{project.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Orçamento:</span>
                  <span className="font-medium">{formatCurrency(project.budget)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progresso:</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    <span>{project.startDate ? new Date(project.startDate).toLocaleDateString('pt-BR') : '-'}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3.5 w-3.5" />
                    <span>{project.endDate ? new Date(project.endDate).toLocaleDateString('pt-BR') : '-'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Client List Sidebar */}
      <div className="lg:fixed lg:right-6 lg:top-24 lg:w-72">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0116 8h1.5a2.5 2.5 0 010 5h-.64c.22.295.42.61.6.94a5.99 5.99 0 01-1.5 2.5 5.977 5.977 0 01-2.28 1.33 6.05 6.05 0 01-.41.13c-.1-.01-.21-.02-.32-.02a5 5 0 01-5-5 5 5 0 015-5v1.5a3.5 3.5 0 100 7 3.5 3.5 0 003.5-3.5h-1.5a2 2 0 10-4 0 2 2 0 002 2z" />
              </svg>
              Meus Clientes
            </CardTitle>
            <CardDescription>{projects.length} clientes ativos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="relative">
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full pl-3 pr-8 py-2 border rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">Todos os clientes</option>
                {clientNames.map((clientName) => (
                  <option key={clientName} value={clientName}>
                    {clientName}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 -mr-2">
              {filteredProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer group ${
                      selectedClient === project.client.name 
                        ? 'bg-muted/70 font-medium' 
                        : 'hover:bg-muted/30'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedClient(project.client.name);
                    }}
                  >
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mr-3"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary">
                        {project.client.name}
                      </p>
                      <div className="flex items-center mt-0.5">
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                          project.status === 'Em andamento' ? 'bg-blue-500' :
                          project.status === 'Concluído' ? 'bg-green-500' :
                          project.status === 'Atrasado' ? 'bg-red-500' :
                          'bg-gray-400'
                        }`}></span>
                        <span className="text-xs text-muted-foreground truncate">
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div 
                      className="text-xs text-muted-foreground ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectDetails(project, e);
                      }}
                    >
                      {project.progress}%
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedProject.description}
                </DialogDescription>
                <div className="flex items-center gap-2 pt-2">
                  <Badge className={getStatusBadge(selectedProject.status)}>{selectedProject.status}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Criado em {new Date(selectedProject.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <Card className="col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Detalhes do Projeto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
                          <p className="text-base">{selectedProject.client.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedProject.client.email}</p>
                          <p className="text-sm text-muted-foreground">{selectedProject.client.phone}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Período</h3>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Início: {new Date(selectedProject.startDate).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm mt-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Término: {selectedProject.endDate ? new Date(selectedProject.endDate).toLocaleDateString('pt-BR') : 'A definir'}</span>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                          <div className="relative mt-1">
                            <div 
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity"
                              style={{
                                backgroundColor: selectedProject.status === 'Em andamento' ? 'rgba(59, 130, 246, 0.1)' :
                                                selectedProject.status === 'Concluído' ? 'rgba(16, 185, 129, 0.1)' :
                                                selectedProject.status === 'Atrasado' ? 'rgba(239, 68, 68, 0.1)' :
                                                'rgba(156, 163, 175, 0.1)',
                                color: selectedProject.status === 'Em andamento' ? 'rgb(37, 99, 235)' :
                                       selectedProject.status === 'Concluído' ? 'rgb(5, 150, 105)' :
                                       selectedProject.status === 'Atrasado' ? 'rgb(220, 38, 38)' : 'rgb(75, 85, 99)'
                              }}
                              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                            >
                              {selectedProject.status}
                              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                            
                            {isStatusDropdownOpen && (
                              <div className="absolute z-10 mt-1 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="py-1">
                                  {['Orçamento', 'Em andamento', 'Concluído', 'Atrasado', 'Pendente'].map((status) => (
                                    <div
                                      key={status}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateProjectStatus(selectedProject.id, status as ProjectStatus);
                                        setIsStatusDropdownOpen(false);
                                      }}
                                    >
                                      {status}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Orçamento</h3>
                          <p className="text-2xl font-bold">{formatCurrency(selectedProject.budget)}</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center text-sm mb-1">
                            <span className="text-muted-foreground">Progresso</span>
                            {isEditingProgress ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  value={editedProgress}
                                  onChange={handleProgressChange}
                                  onKeyDown={handleProgressKeyDown}
                                  onBlur={saveProgress}
                                  className="w-16 px-2 py-1 text-right border rounded text-sm"
                                  min="0"
                                  max="100"
                                  autoFocus
                                />
                                <span>%</span>
                              </div>
                            ) : (
                              <button 
                                className="text-sm font-medium hover:bg-muted/30 px-2 py-1 rounded transition-colors"
                                onClick={handleProgressClick}
                              >
                                {selectedProject.progress}%
                              </button>
                            )}
                          </div>
                          <div className="relative">
                            <Progress value={selectedProject.progress} className="h-2" />
                            <div 
                              className="absolute inset-0 cursor-pointer"
                              onClick={handleProgressClick}
                            />
                          </div>
                        </div>

                        {selectedProject.items && selectedProject.items.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Itens do Projeto</h3>
                            <div className="space-y-2">
                              {selectedProject.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm p-2 bg-muted/30 rounded">
                                  <div>
                                    <p className="font-medium">{item.description}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {item.quantity} × {formatCurrency(item.unitPrice)}
                                    </p>
                                  </div>
                                  <span className="font-medium">{formatCurrency(item.total)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Observações</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-foreground h-8 px-2"
                          onClick={() => {
                            if (!selectedProject) return;
                            if (!isEditingNotes) {
                              setEditedNotes(selectedProject.notes || '');
                            }
                            setIsEditingNotes(!isEditingNotes);
                          }}
                        >
                          {isEditingNotes ? 'Cancelar' : 'Editar'}
                        </Button>
                      </div>
                      
                      {isEditingNotes ? (
                        <div className="space-y-2">
                          <Textarea
                            value={editedNotes}
                            onChange={(e) => setEditedNotes(e.target.value)}
                            placeholder="Adicione observações sobre o projeto"
                            rows={3}
                            className="min-h-[100px]"
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setIsEditingNotes(false);
                              }}
                            >
                              Cancelar
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => {
                                if (!selectedProject) return;
                                updateProjectNotes(selectedProject.id, editedNotes);
                                setIsEditingNotes(false);
                                
                                // Here you would typically save the notes to your backend
                                // Example:
                                // await updateProjectInDatabase(selectedProject.id, { notes: editedNotes });
                              }}
                            >
                              Salvar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className={`p-4 bg-muted/20 rounded-lg ${!selectedProject.notes ? 'cursor-pointer hover:bg-muted/30' : ''}`}
                          onClick={() => {
                            if (!selectedProject.notes) {
                              setEditedNotes('');
                              setIsEditingNotes(true);
                            }
                          }}
                        >
                          {selectedProject.notes ? (
                            <p className="text-foreground whitespace-pre-line">
                              {selectedProject.notes}
                            </p>
                          ) : (
                            <p className="text-muted-foreground italic">
                              Clique para adicionar observações
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Fechar
                </Button>
                <Button>Gerar Recibo</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo de Novo Projeto */}
      <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Novo Projeto</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo projeto
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dados do Cliente */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dados do Cliente</h3>
                <div className="space-y-2">
                  <Label htmlFor="clientName">Nome do Cliente</Label>
                  <Input
                    id="clientName"
                    value={newProject.client.name}
                    onChange={(e) => setNewProject(prev => ({
                      ...prev,
                      client: { ...prev.client, name: e.target.value }
                    }))}
                    placeholder="Nome completo"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">E-mail</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={newProject.client.email}
                      onChange={(e) => setNewProject(prev => ({
                        ...prev,
                        client: { ...prev.client, email: e.target.value }
                      }))}
                      placeholder="email@exemplo.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientPhone">Telefone</Label>
                    <Input
                      id="clientPhone"
                      value={newProject.client.phone}
                      onChange={(e) => setNewProject(prev => ({
                        ...prev,
                        client: { ...prev.client, phone: e.target.value }
                      }))}
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Dados do Projeto */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Dados do Projeto</h3>
                <div className="space-y-3">
                  <Label htmlFor="projectTitle">Título do Projeto</Label>
                  <Input
                    id="projectTitle"
                    value={newProject.title}
                    onChange={(e) => setNewProject(prev => ({
                      ...prev,
                      title: e.target.value
                    }))}
                    placeholder="Ex: Site Institucional"
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="projectDescription">Descrição</Label>
                  <Textarea
                    id="projectDescription"
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                    placeholder="Descreva o projeto detalhadamente"
                    rows={3}
                    className="w-full"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectStatus">Status</Label>
                    <Select 
                      value={newProject.status}
                      onValueChange={(value) => setNewProject(prev => ({
                        ...prev,
                        status: value as ProjectStatus
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Orçamento">Orçamento</SelectItem>
                        <SelectItem value="Em andamento">Em andamento</SelectItem>
                        <SelectItem value="Concluído">Concluído</SelectItem>
                        <SelectItem value="Atrasado">Atrasado</SelectItem>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Data de Início</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newProject.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newProject.startDate ? (
                            newProject.startDate.toLocaleDateString('pt-BR')
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={newProject.startDate}
                          onSelect={(date) => date && setNewProject(prev => ({
                            ...prev,
                            startDate: date
                          }))}
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Data de Término</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newProject.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newProject.endDate ? (
                            newProject.endDate.toLocaleDateString('pt-BR')
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={newProject.endDate}
                          onSelect={(date) => setNewProject(prev => ({
                            ...prev,
                            endDate: date || undefined
                          }))}
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectBudget">Orçamento Total (R$)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="projectBudget"
                      type="number"
                      step="0.01"
                      value={newProject.budget}
                      onChange={(e) => setNewProject(prev => ({
                        ...prev,
                        budget: e.target.value
                      }))}
                      className="pl-9"
                      placeholder="0,00"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Itens do Projeto */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Itens do Projeto</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddItem}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Item
                </Button>
              </div>
              
              <div className="space-y-4">
                {newProject.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-5 space-y-2">
                      <Label htmlFor={`item-desc-${index}`}>Descrição</Label>
                      <Input
                        id={`item-desc-${index}`}
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        placeholder="Descrição do item"
                        required
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor={`item-qty-${index}`}>Qtd.</Label>
                      <Input
                        id={`item-qty-${index}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        className="text-right"
                        required
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor={`item-price-${index}`}>Valor Unit.</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                        <Input
                          id={`item-price-${index}`}
                          type="number"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                          className="pl-10 text-right"
                          placeholder="0,00"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Total</Label>
                      <div className="flex h-10 items-center justify-end rounded-md border border-input bg-background px-3 py-2 text-sm">
                        R$ {parseFloat(item.total || '0').toFixed(2)}
                      </div>
                    </div>
                    <div className="col-span-1 flex items-end h-10">
                      {newProject.items.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              
              <Label htmlFor="projectNotes">Observações</Label>
              <Textarea
                id="projectNotes"
                value={newProject.notes}
                onChange={(e) => setNewProject(prev => ({
                  ...prev,
                  notes: e.target.value
                }))}
                placeholder="Adicione observações importantes sobre o projeto"
                rows={3}
              />
            </div>

            {/* Ações */}
            <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewProjectDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Projeto
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }