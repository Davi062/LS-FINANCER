"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Seg",
    total: 1200,
  },
  {
    name: "Ter",
    total: 900,
  },
  {
    name: "Qua",
    total: 1500,
  },
  {
    name: "Qui",
    total: 1100,
  },
  {
    name: "Sex",
    total: 2200,
  },
  {
    name: "Sáb",
    total: 2800,
  },
  {
    name: "Dom",
    total: 400,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#236F5D"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#236F5D"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
        />
        <Bar
          dataKey="total"
          fill="#236F5D"
          radius={[4, 4, 0, 0]}
          className="opacity-80 hover:opacity-100 transition-opacity"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
