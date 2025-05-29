'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Calculator, TrendingUp, AlertCircle } from 'lucide-react'

interface ForecastData {
  month: string
  actual: number
  predicted: number
}

interface ExpenseForecastProps {
  historicalData: ForecastData[]
  predictions: ForecastData[]
  alerts: string[]
}

export function ExpenseForecast({ historicalData, predictions, alerts }: ExpenseForecastProps) {
  const allData = [...historicalData, ...predictions]

  return (
    <Card className="border-[#236F5D]/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Previsão de Despesas</CardTitle>
          <Calculator className="h-5 w-5 text-[#236F5D]" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={allData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis dataKey="month" stroke="#236F5D" fontSize={12} />
                <YAxis stroke="#236F5D" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid #236F5D' }}
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, '']}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#236F5D"
                  strokeWidth={2}
                  dot={{ fill: '#236F5D' }}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#236F5D"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#236F5D' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2 p-2 bg-[#236F5D]/5 rounded-lg"
              >
                <AlertCircle className="h-4 w-4 text-[#236F5D]" />
                <span className="text-sm text-[#236F5D]">{alert}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#236F5D]/20">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-[#236F5D]" />
              <span className="text-sm font-medium">Tendência de Gastos</span>
            </div>
            <span className="text-sm text-[#236F5D]">
              {predictions[predictions.length - 1].predicted > historicalData[historicalData.length - 1].actual
                ? 'Aumento previsto'
                : 'Redução prevista'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}