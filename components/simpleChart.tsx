"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Scissors, TrendingUp } from "lucide-react";

interface BarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

const BarComponent = ({ label, value, maxValue, color }: BarProps) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">R$ {value.toLocaleString()}</span>
      </div>
      <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export const SimpleBarChart = () => {
  // Dados de exemplo para um gráfico de barras de faturamento mensal
  const monthlyData = [
    { month: 'Janeiro', value: 8500 },
    { month: 'Fevereiro', value: 12300 },
    { month: 'Março', value: 10800 },
    { month: 'Abril', value: 9600 },
    { month: 'Maio', value: 11200 },
    { month: 'Junho', value: 13500 },
  ];

  // Encontrar o valor máximo para dimensionar as barras corretamente
  const maxValue = Math.max(...monthlyData.map(item => item.value));
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle>Faturamento</CardTitle>
          <CardDescription>Janeiro a Junho</CardDescription>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <BarChart3 className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        {monthlyData.map((item, index) => (
          <BarComponent
            key={item.month}
            label={item.month}
            value={item.value}
            maxValue={maxValue}
            color={`hsl(${index * 30}, 70%, 50%)`}
          />
        ))}
      </CardContent>
    </Card>
  );
};

// Componente para estatísticas de agendamentos por serviço
export const ServiceStatsChart = () => {
  const serviceData = [
    { service: 'Corte Degradê', count: 48 },
    { service: 'Barba Completa', count: 32 },
    { service: 'Corte + Barba', count: 28 },
    { service: 'Sobrancelha', count: 15 },
  ];
  
  const maxCount = Math.max(...serviceData.map(item => item.count));
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle>Serviços Populares</CardTitle>
          <CardDescription>Total de agendamentos</CardDescription>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Scissors className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        {serviceData.map((item, index) => (
          <div key={item.service} className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{item.service}</span>
              <span className="text-sm text-muted-foreground">{item.count} agendamentos</span>
            </div>
            <div className="w-full h-2 bg-secondary/30 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${(item.count / maxCount) * 100}%`, backgroundColor: `hsl(${210 + index * 25}, 70%, 50%)` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
