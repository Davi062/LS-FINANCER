"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";


// Dados de exemplo
const monthlyData = [
  { name: 'Jan', gastos: 2400, orcamento: 3000 },
  { name: 'Fev', gastos: 1398, orcamento: 3000 },
  { name: 'Mar', gastos: 2800, orcamento: 3000 },
  { name: 'Abr', gastos: 3100, orcamento: 3000 },
  { name: 'Mai', gastos: 1890, orcamento: 3000 },
  { name: 'Jun', gastos: 2500, orcamento: 3000 },
];

const transactions = [
  { id: 1, date: '02/06/2024', description: 'Serviço de Desenvolvimento', value: 1200, status: 'Pago' },
  { id: 2, date: '15/06/2024', description: 'Manutenção Mensal', value: 500, status: 'Pendente' },
  { id: 3, date: '20/06/2024', description: 'Consultoria', value: 800, status: 'Atrasado' },
  { id: 4, date: '25/06/2024', description: 'Hospedagem', value: 200, status: 'Pago' },
];

const totalGastos = monthlyData.reduce((sum, month) => sum + month.gastos, 0);
const orcamentoMensal = 3000;
const saldoDisponivel = orcamentoMensal - totalGastos / monthlyData.length;

export default function ClientPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen w-full">
      <main className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Olá, Cliente</h1>
              <p className="text-muted-foreground">Acompanhe suas finanças</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Resumo Financeiro */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gasto Total</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalGastos)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total gasto no período
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orçamento Mensal</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(orcamentoMensal)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Seu limite mensal
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Gastos Mensais */}
          <Card>
            <CardHeader>
              <CardTitle>Gastos Mensais</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="gastos" 
                    name="Gastos" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orcamento" 
                    name="Orçamento" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
      </main>
    </div>
  );
}