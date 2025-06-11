"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { 
  ChartNoAxesCombined,
} from 'lucide-react';

// Mock data for the chart
const monthlyData = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Fev', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 2000, expenses: 9800 },
  { name: 'Abr', income: 2780, expenses: 3908 },
  { name: 'Mai', income: 1890, expenses: 4800 },
  { name: 'Jun', income: 2390, expenses: 3800 },
];

// Types
type ProjectStatus = 'Em andamento' | 'Concluído' | 'Orçamento' | 'Pendente';

interface Client {
  id: number;
  name: string;
  email: string;
  project: string;
  value: number;
  status: ProjectStatus;
  startDate: string | null;
  endDate: string | null;
  projectDescription?: string;
}

// Mock client data with project values
const clients: Client[] = [
  { 
    id: 1, 
    name: 'João Silva', 
    email: 'joao@example.com',
    project: 'Site Institucional',
    value: 5000,
    status: 'Em andamento',
    startDate: '2025-05-15',
    endDate: '2025-07-15',
    projectDescription: 'Desenvolvimento de site institucional responsivo com painel administrativo.'
  },
  { 
    id: 2, 
    name: 'Maria Santos', 
    email: 'maria@example.com',
    project: 'Loja Virtual',
    value: 12000,
    status: 'Concluído',
    startDate: '2025-04-10',
    endDate: '2025-05-30',
    projectDescription: 'E-commerce completo com integração de pagamentos e gestão de estoque.'
  },
  { 
    id: 3, 
    name: 'Carlos Oliveira', 
    email: 'carlos@example.com',
    project: 'Aplicativo Móvel',
    value: 25000,
    status: 'Em andamento',
    startDate: '2025-06-01',
    endDate: '2025-09-30',
    projectDescription: 'Aplicativo iOS e Android com backend em nuvem e sincronização em tempo real.'
  },
  { 
    id: 4, 
    name: 'Ana Costa', 
    email: 'ana@example.com',
    project: 'Landing Page',
    value: 3000,
    status: 'Orçamento',
    startDate: null,
    endDate: null,
    projectDescription: 'Página de captura para lançamento de novo produto.'
  },
];

export default function AdminPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client => {
    const searchLower = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.project.toLowerCase().includes(searchLower) 
    );
  });
  
  const getStatusColor = (status: ProjectStatus) => {
    switch(status.toLowerCase()) {
      case 'concluído':
        return 'bg-green-100 text-green-800';
      case 'em andamento':
        return 'bg-blue-100 text-blue-800';
      case 'orçamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'pendente':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate totals
  const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0);
  const totalExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0);

  return (

    <div className="lg:w-full w-full ">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      
      {/* Income/Expense Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-3">
        <Card className="shadow-lg hover:shadow-xl transition-colors duration-7000 ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ganhos Totais</CardTitle>
            <span className="h-4 w-4 text-muted-foreground">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">+20.1% em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-colors duration-7000 ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos Totais</CardTitle>
            <span className="h-4 w-4 text-muted-foreground">💸</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">+5.3% em relação ao mês passado</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart and Clients */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row-reverse items-center justify-between ">
          <ChartNoAxesCombined className="w-5 h-5 text-muted-foreground" />
            <CardTitle>Desempenho Mensal</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#4CAF50" name="Ganhos" />
                <Line type="monotone" dataKey="expenses" stroke="#F44336" name="Gastos" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Clientes</CardTitle>
              <div className="w-64">
                <Input
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-8"
                />
              </div>
            </div>
          </CardHeader> 
          <CardContent className="p-0">
            <div className="max-h-[500px] overflow-y-auto p-4 space-y-4">
            {filteredClients.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum cliente encontrado
              </div>
            ) : (
              filteredClients.map((client) => (
              <div key={client.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                <Dialog onOpenChange={(open) => {
                  if (open) {
                    setSelectedClient(client);
                    setIsDialogOpen(true);
                  } else {
                    setIsDialogOpen(false);
                  }
                }}>
                  <DialogTrigger asChild>
                    <div className="w-full cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{client.name}</h3>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">{client.project}</p>
                        <p className="text-lg font-bold text-green-600">
                          R$ {client.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        {client.endDate && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Previsão: {new Date(client.endDate).toLocaleDateString('pt-BR')}
                          </p>
                        )}
                      </div>
                    </div>
                  </DialogTrigger>
                  
                  <DialogContent className="sm:max-w-[600px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                      <DialogTitle>Detalhes do Projeto</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Cliente</h4>
                          <p className="text-base">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                        </div>
                        <div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Valor do Projeto</h4>
                          <p className="text-2xl font-bold text-green-600">
                            R$ {client.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Ativo desde</h4>
                          <p className="text-sm">
                            {client.startDate 
                              ? new Date(client.startDate).toLocaleDateString('pt-BR')
                              : 'Data não informada'}
                          </p>
                        </div>
                      </div>        
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}