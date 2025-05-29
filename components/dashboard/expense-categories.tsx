'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'

interface CategoryData {
  name: string
  amount: number
  trend: number
  alert?: string
}

interface ExpenseCategoriesProps {
  categories: CategoryData[]
}

export function ExpenseCategories({ categories }: ExpenseCategoriesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="transform hover:scale-105 transition-transform duration-200 cursor-pointer border-[#236F5D]/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 transform rotate-45 translate-x-10 -translate-y-10 bg-[#236F5D]/5" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
              <DollarSign className="h-4 w-4 text-[#236F5D]" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="text-2xl font-bold text-[#236F5D]">
                  R$ {category.amount.toFixed(2)}
                </div>
                <div className="flex items-center space-x-2">
                  {category.trend > 0 ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  )}
                  <span className={`text-sm ${category.trend > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {Math.abs(category.trend)}% em relação ao mês anterior
                  </span>
                </div>
                {category.alert && (
                  <div className="flex items-center space-x-2 text-amber-500 mt-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">{category.alert}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}