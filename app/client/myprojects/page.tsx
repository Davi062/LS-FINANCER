'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, FileText, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProjectStatus = 'Em andamento' | 'Concluído' | 'Aguardando pagamento' | 'Pausado';

interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  totalValue: number;
  amountPaid: number;
  startDate: string;
  estimatedEndDate: string;
  owner: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  lastUpdate: string;
}

export default function MyProjectsPage() {
  // Mock data - in a real app, this would come from an API
  const projects: Project[] = [
    {
      id: '1',
      name: 'Sistema de Gestão Financeira',
      description: 'Desenvolvimento de um sistema completo para gestão financeira empresarial com relatórios personalizados.',
      status: 'Em andamento',
      progress: 65,
      totalValue: 15000,
      amountPaid: 9750,
      startDate: '15/03/2024',
      estimatedEndDate: '30/07/2024',
      lastUpdate: '25/05/2024',
      owner: {
        name: 'LinkSystem',
        email: 'LinkSystem@empresa.com',
        phone: '(11) 98765-4321',
        avatar: '/avatars/joao.jpg'
      }
    },
    {
      id: '2',
      name: 'Aplicativo Mobile',
      description: 'Desenvolvimento de aplicativo iOS e Android para clientes da empresa.',
      status: 'Aguardando pagamento',
      progress: 0,
      totalValue: 25000,
      amountPaid: 0,
      startDate: '01/06/2024',
      estimatedEndDate: '01/12/2024',
      lastUpdate: '28/05/2024',
      owner: {
        name: 'LinkSystem',
        email: 'LinkSystem@empresa.com',
        phone: '(11) 98765-4321',
        avatar: '/avatars/joao.jpg'
      }
    }
  ];

  const getStatusBadgeVariant = (status: ProjectStatus) => {
    switch (status) {
      case 'Em andamento':
        return 'bg-blue-100 text-blue-800';
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Aguardando pagamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pausado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Projetos</h1>
          <p className="text-muted-foreground">Acompanhe o andamento dos seus projetos e pagamentos</p>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
                  </div>
                  <Badge className={getStatusBadgeVariant(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-3">Progresso do Projeto</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Início</p>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium">{project.startDate}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Previsão de Término</p>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium">{project.estimatedEndDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Informações Financeiras</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Valor Total</p>
                        <p className="text-lg font-semibold">{formatCurrency(project.totalValue)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Valor Pago</p>
                        <p className="text-lg font-semibold text-green-600">{formatCurrency(project.amountPaid)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Saldo Pendente</p>
                        <p className="text-lg font-semibold text-amber-600">
                          {formatCurrency(project.totalValue - project.amountPaid)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-medium mb-3">Contato da empresa</h3>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={project.owner.avatar} alt={project.owner.name} />
                      <AvatarFallback>{project.owner.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{project.owner.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{project.owner.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{project.owner.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="bg-muted/50 border-t px-6 py-4">
                <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
                  <span>Última atualização: {project.lastUpdate}</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Contrato
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
