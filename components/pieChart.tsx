"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface ComponentPieChartProps {
  totalPayments: number;
  completedPayments: number;
  pendingPayments: number;
  overduePayments: number;
}

export function ComponentPieChart({
  totalPayments,
  completedPayments,
  pendingPayments,
  overduePayments,
}: ComponentPieChartProps) {
  const data = [
    { name: "Confirmados", value: completedPayments },
    { name: "Pendentes", value: pendingPayments },
    { name: "Atrasados", value: overduePayments },
  ].filter(item => item.value > 0);

  const COLORS = ["#16a34a", "#eab308", "#dc2626"];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
