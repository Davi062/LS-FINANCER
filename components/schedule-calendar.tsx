'use client'

import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/pt-br'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

moment.locale('pt-br')
const localizer = momentLocalizer(moment)

const BUSINESS_HOURS = {
  start: "09:00",
  end: "18:00",
  interval: 30
};

interface Client {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
}

interface Appointment {
  id: string;
  client_id: string;
  professional_id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string;
  services: Array<{
    service_id: string;
    quantity: number;
  }>;
  client?: Client;
  service?: Service;
}

export function ScheduleCalendar({ 
  appointments = [], 
  onTimeSelect,
  selectedProfessionalId,
  clients = [],
  services = [],
  onEventClick,
  onCreateClick
}: { 
  appointments?: Appointment[],
  onTimeSelect?: (time: Date) => void,
  selectedProfessionalId?: string | null,
  clients?: Client[],
  services?: Service[],
  onEventClick?: (appointment: Appointment) => void,
  onCreateClick?: () => void
}) {
  const diasSemanaData = [
    new Date(2025, 2, 24, 0, 0, 0, 0), // Segunda
    new Date(2025, 2, 25, 0, 0, 0, 0), // Terça
    new Date(2025, 2, 26, 0, 0, 0, 0), // Quarta
    new Date(2025, 2, 27, 0, 0, 0, 0), // Quinta
    new Date(2025, 2, 28, 0, 0, 0, 0), // Sexta
    new Date(2025, 2, 29, 0, 0, 0, 0), // Sábado
  ]

  const formatEvents = () => {
    let events: any[] = []

    appointments.forEach((apt, index) => {
      const startDate = parseISO(apt.appointment_date)
      const [startHour, startMinute] = apt.start_time.split(':')
      const [endHour, endMinute] = apt.end_time.split(':')

      const start = new Date(startDate)
      start.setHours(parseInt(startHour), parseInt(startMinute))

      const end = new Date(startDate)
      end.setHours(parseInt(endHour), parseInt(endMinute))

      const client = clients.find(c => c.id === apt.client_id)
      const service = apt.services[0] && services.find(s => s.id === apt.services[0].service_id)

      events.push({
        resource: { appointment: apt },
        title: `${client?.name || 'Cliente'} - ${service?.name || 'Serviço'}`,
        start,
        end,
        backgroundColor: apt.status === 'pending' ? '#FEF3C7' : '#DCFCE7',
        textColor: apt.status === 'pending' ? '#B45309' : '#166534'
      })
    })

    return events
  }

  return (
    <Card className="flex-1">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Horários de Atendimento</h2>
          <button
            onClick={onCreateClick}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          >
            + Novo Horário
          </button>
        </div>

        <Calendar
          localizer={localizer}
          events={formatEvents()}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          formats={{
            dateFormat: 'dd',
            dayFormat: (date, culture, localizer) =>
              localizer.format(date, 'dddd', culture),
          }}
          date={diasSemanaData[moment().day()]}
          view="week"
          views={['week']}
          min={new Date(2025, 2, 24, 9, 0, 0)}
          max={new Date(2025, 2, 24, 18, 0, 0)}
          selectable
          onSelectSlot={(slotInfo: any) => {
            const { start } = slotInfo
            onTimeSelect?.(start)
          }}
          onSelectEvent={(event: any) => {
            const { appointment } = event.resource
            onEventClick?.(appointment)
          }}
          eventPropGetter={(event: any) => ({
            style: {
              backgroundColor: event.backgroundColor,
              color: event.textColor,
              border: 'none',
              borderRadius: '4px'
            }
          })}
          toolbar={false}
        />
      </div>
    </Card>
  )
}
