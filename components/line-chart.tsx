"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, Legend, ResponsiveContainer, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Transaction {
  type: string;
  amount: number;
  transaction_date: string;
  category?: string;
}

interface LineChartProps {
  data: Transaction[];
}

interface MonthData {
  month: string;
  saidas: number;
  entradas: number;
  sangrias: number;
}

const chartConfig = {
  saidas: {
    label: "Saídas",
    color: "#dc2626", // Vermelho
  },
  entradas: {
    label: "Entradas",
    color: "#16a34a", // Verde
  },
  sangrias: {
    label: "Sangrias",
    color: "#2563eb", // Azul
  },
}

export function LineChartComponent({ data }: LineChartProps) {
  const processChartData = (): MonthData[] => {
    const monthlyData = new Map<string, MonthData>();
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // Inicializa os dados para todos os meses
    months.forEach(month => {
      monthlyData.set(month, {
        month,
        saidas: 0,
        entradas: 0,
        sangrias: 0
      });
    });

    // Proteção para caso não haja dados
    if (!data || data.length === 0) {
      return Array.from(monthlyData.values());
    }

    // Processa as transações
    data.forEach(transaction => {
      try {
        const date = new Date(transaction.transaction_date);
        if (isNaN(date.getTime())) return; // Pula se a data for inválida
        
        const month = months[date.getMonth()];
        const monthData = monthlyData.get(month);
        if (!monthData) return;

        const amount = Number(transaction.amount) || 0;

        if (transaction.type === "expense" && transaction.category === "Sangria") {
          monthData.sangrias = (monthData.sangrias || 0) + amount;
        } else if (transaction.type === "expense") {
          monthData.saidas = (monthData.saidas || 0) + amount;
        } else if (transaction.type === "income") {
          monthData.entradas = (monthData.entradas || 0) + amount;
        }
      } catch (error) {
        console.error("Erro ao processar transação:", error);
      }
    });

    // Converte para array e ordena pelos meses
    return Array.from(monthlyData.values())
      .sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month));
  };

  const chartData = processChartData();

  return (
    <Card className="lg:w-[100%]">
      <CardHeader>
        <CardTitle>Gráfico de entradas, saídas e sangrias</CardTitle>
        <CardDescription>
          {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => 
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(value)
                }
              />
              <Tooltip 
                formatter={(value: number) => 
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(value)
                }
              />
              <Legend />
              <Line
                name="Saídas"
                type="monotone"
                dataKey="saidas"
                stroke={chartConfig.saidas.color}
                strokeWidth={2}
                dot={false}
              />
              <Line
                name="Entradas"
                type="monotone"
                dataKey="entradas"
                stroke={chartConfig.entradas.color}
                strokeWidth={2}
                dot={false}
              />
              <Line
                name="Sangrias"
                type="monotone"
                dataKey="sangrias"
                stroke={chartConfig.sangrias.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>Dados atualizados</span>
        </div>
      </CardFooter>
    </Card>
  )
}
