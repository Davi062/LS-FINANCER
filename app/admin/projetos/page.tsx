"use client";

import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, DollarSign, FileText, Mail, Phone, Plus, Search, User } from "lucide-react";

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => 
    project.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (!searchTerm) {
      <h1>Projetos</h1>
    }
  }, [filteredProjects, searchTerm]);

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
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Projeto
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openProjectDetails(project)}>
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
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar cliente..."
                className="w-full pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 -mr-2">
              {projects
                .filter(project => 
                  project.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  project.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((project) => (
                  <div 
                    key={project.id} 
                    className="flex items-center p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                    onClick={() => openProjectDetails(project)}
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
                    <div className="text-xs text-muted-foreground ml-2">
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
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1" style={{
                            backgroundColor: selectedProject.status === 'Em andamento' ? 'rgba(59, 130, 246, 0.1)' :
                                            selectedProject.status === 'Concluído' ? 'rgba(16, 185, 129, 0.1)' :
                                            selectedProject.status === 'Atrasado' ? 'rgba(239, 68, 68, 0.1)' :
                                            'rgba(156, 163, 175, 0.1)',
                            color: selectedProject.status === 'Em andamento' ? 'rgb(37, 99, 235)' :
                                   selectedProject.status === 'Concluído' ? 'rgb(5, 150, 105)' :
                                   selectedProject.status === 'Atrasado' ? 'rgb(220, 38, 38)' : 'rgb(75, 85, 99)'
                          }}>
                            {selectedProject.status}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Orçamento</h3>
                          <p className="text-2xl font-bold">{formatCurrency(selectedProject.budget)}</p>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progresso</span>
                            <span>{selectedProject.progress}%</span>
                          </div>
                          <Progress value={selectedProject.progress} className="h-2" />
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

                    {selectedProject.notes && (
                      <div className="pt-4 border-t">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Observações</h3>
                        <div className="p-4 bg-muted/20 rounded-lg">
                          <p className="text-foreground whitespace-pre-line">
                            {selectedProject.notes}
                          </p>
                        </div>
                      </div>
                    )}
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
    </div>
  );
}