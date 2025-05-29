'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { format } from 'date-fns'
import { clsx } from 'clsx'

interface Professional {
  id: number
  name: string
  position: string
  email: string
  phone_number: string
}

interface Schedule {
  day_of_week: string
  start_time: string
  end_time: string
  is_day_off: boolean
}

interface ProfessionalSchedule {
  professional_id: string
  schedules: Schedule[]
}

export function ProfessionalsCarousel({
  onProfessionalSelect,
  selectedProfessionalId
}: {
  onProfessionalSelect?: (id: string) => void
  selectedProfessionalId?: string | null
}) {
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [schedules, setSchedules] = useState<ProfessionalSchedule[]>([])

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch('https://api.linkcallendar.com/teams', {
          headers: {
            'company_id': ""
          }
        })
        const data = await response.json()
        setProfessionals(data)
      } catch (error) {
        console.error('Erro ao buscar profissionais:', error)
      }
    }

    fetchProfessionals()
  }, [])

  const defaultSchedules = [
    { day_of_week: 'Monday', start_time: "09:00", end_time: "18:00", is_day_off: false },
    { day_of_week: 'Tuesday', start_time: "09:00", end_time: "18:00", is_day_off: false },
    { day_of_week: 'Wednesday', start_time: "09:00", end_time: "18:00", is_day_off: false },
    { day_of_week: 'Thursday', start_time: "09:00", end_time: "18:00", is_day_off: false },
    { day_of_week: 'Friday', start_time: "09:00", end_time: "18:00", is_day_off: false },
    { day_of_week: 'Saturday', start_time: "09:00", end_time: "18:00", is_day_off: false },
    { day_of_week: 'Sunday', start_time: "09:00", end_time: "18:00", is_day_off: true }
  ]

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const promises = professionals.map(async (professional) => {
          try {
            const response = await fetch(`http://localhost:3131/schedules/${professional.id}`, {
              headers: {
                'company_id': '1'
              }
            })
            const data = await response.json()
            
            if (!data.schedules || data.schedules.length === 0) {
              return {
                professional_id: professional.id.toString(),
                schedules: defaultSchedules
              }
            }

            return {
              professional_id: professional.id.toString(),
              schedules: data.schedules
            }
          } catch (error) {
            console.error('Erro ao buscar horário do profissional:', professional.id, error)
            return {
              professional_id: professional.id.toString(),
              schedules: defaultSchedules
            }
          }
        })

        const allSchedules = await Promise.all(promises)
        setSchedules(allSchedules)
      } catch (error) {
        console.error('Erro ao buscar horários:', error)
      }
    }

    if (professionals.length > 0) {
      fetchSchedules()
    }
  }, [professionals])

  return (
    <ScrollArea className="h-[calc(100vh-2rem)] w-72">
      <div className="p-4 space-y-4">
        {professionals.map((professional) => {
          const professionalSchedules = schedules.find(s => s.professional_id === professional.id.toString())?.schedules || []
          const todaySchedule = professionalSchedules.find(s => s.day_of_week === format(new Date(), 'EEEE'))
          const isSelected = selectedProfessionalId === professional.id.toString()

          return (
            <Card
              key={professional.id}
              className={clsx(
                'cursor-pointer transition-colors',
                isSelected ? 'bg-primary/10' : ''
              )}
              onClick={() => onProfessionalSelect?.(professional.id.toString())}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${professional.name}`} />
                    <AvatarFallback>{professional.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{professional.name}</p>
                    <p className="text-sm text-muted-foreground">{professional.position}</p>
                    {todaySchedule && (
                      <div className="mt-2">
                        <Badge variant={todaySchedule.is_day_off ? "destructive" : "secondary"}>
                          {todaySchedule.is_day_off ? 'Folga' : `${todaySchedule.start_time} - ${todaySchedule.end_time}`}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </ScrollArea>
  )
}
