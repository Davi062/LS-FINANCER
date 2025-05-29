'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OpeningHoursProps {
    onNewSchedule?: () => void
}

const DAYS = [
    { id: 0, name: 'domingo' },
    { id: 1, name: 'segunda-feira' },
    { id: 2, name: 'terça-feira' },
    { id: 3, name: 'quarta-feira' },
    { id: 4, name: 'quinta-feira' },
    { id: 5, name: 'sexta-feira' },
    { id: 6, name: 'sábado' }
]

const HOURS = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    time: `${i + 9}:00`
}))

export function OpeningHours({ onNewSchedule }: OpeningHoursProps) {
    const [selectedDay, setSelectedDay] = useState<number | null>(null)
    const [selectedHour, setSelectedHour] = useState<number | null>(null)

    return (
        <Card className="w-[280px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                    Horários de Atendimento
                </CardTitle>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onNewSchedule}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        {DAYS.map(day => (
                            <button
                                key={day.id}
                                onClick={() => setSelectedDay(day.id)}
                                className={cn(
                                    'w-full text-left px-2 py-1 rounded text-sm transition-colors',
                                    selectedDay === day.id
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                )}
                            >
                                {day.name}
                            </button>
                        ))}
                    </div>
                    <div className="space-y-1">
                        {HOURS.map(hour => (
                            <button
                                key={hour.id}
                                onClick={() => setSelectedHour(hour.id)}
                                className={cn(
                                    'w-full text-left px-2 py-1 rounded text-sm transition-colors',
                                    selectedHour === hour.id
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                )}
                            >
                                {hour.time}
                            </button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
