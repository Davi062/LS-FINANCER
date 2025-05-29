"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react"

export default function Admin() {
  // Dados de exemplo para o gráfico
  const chartData = [
    { name: 'Jan', ganhos: 4000, gastos: 2400 },
    { name: 'Fev', ganhos: 3000, gastos: 1398 },
    { name: 'Mar', ganhos: 2000, gastos: 9800 },
    { name: 'Abr', ganhos: 2780, gastos: 3908 },
    { name: 'Mai', ganhos: 1890, gastos: 4800 },
    { name: 'Jun', ganhos: 2390, gastos: 3800 },
    { name: 'Jul', ganhos: 3490, gastos: 4300 },
  ]

  // Calcula totais
  const totalGanhos = chartData.reduce((sum, item) => sum + item.ganhos, 0)
  const totalGastos = chartData.reduce((sum, item) => sum + item.gastos, 0)
  const saldo = totalGanhos - totalGastos
  const variacao = ((chartData[chartData.length - 1].ganhos - chartData[0].ganhos) / chartData[0].ganhos * 100).toFixed(1)

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold text-foreground">Visão Geral</h1>
      
      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ganhos Totais</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalGanhos)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className={parseFloat(variacao) >= 0 ? 'text-green-500' : 'text-red-500'}>
                {variacao}% em relação ao início do ano
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos Totais</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalGastos)}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((totalGastos / totalGanhos) * 100)}% dos ganhos
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            {saldo >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldo)}
            </div>
            <p className="text-xs text-muted-foreground">
              {saldo >= 0 ? 'Saldo positivo' : 'Saldo negativo'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalGanhos / chartData.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Média de ganhos por mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico */}
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Evolução Mensal</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorGanhos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <Tooltip 
                formatter={(value) => [
                  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value)),
                  value === 'ganhos' ? 'Ganhos' : 'Gastos'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="ganhos" 
                name="Ganhos"
                stroke="#4ade80"
                fillOpacity={1} 
                fill="url(#colorGanhos)" 
              />
              <Area 
                type="monotone" 
                dataKey="gastos" 
                name="Gastos"
                stroke="#f87171"
                fillOpacity={1} 
                fill="url(#colorGastos)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}