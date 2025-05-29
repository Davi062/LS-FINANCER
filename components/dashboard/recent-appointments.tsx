"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentAppointments = [
  {
    client: "João Silva",
    service: "Corte + Barba",
    time: "14:30",
    status: "Confirmado",
    value: "R$ 75,00",
    avatar: "/avatars/01.png",
  },
  {
    client: "Pedro Santos",
    service: "Corte",
    time: "15:00",
    status: "Pendente",
    value: "R$ 45,00",
    avatar: "/avatars/02.png",
  },
  {
    client: "Carlos Oliveira",
    service: "Barba",
    time: "15:30",
    status: "Confirmado",
    value: "R$ 35,00",
    avatar: "/avatars/03.png",
  },
  {
    client: "André Costa",
    service: "Corte + Barba",
    time: "16:00",
    status: "Confirmado",
    value: "R$ 75,00",
    avatar: "/avatars/04.png",
  },
]

export function RecentAppointments() {
  return (
    <div className="space-y-8">
      {recentAppointments.map((appointment, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={appointment.avatar} alt="Avatar" />
            <AvatarFallback>
              {appointment.client.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{appointment.client}</p>
            <p className="text-sm text-muted-foreground">
              {appointment.service} - {appointment.time}
            </p>
          </div>
          <div className="ml-auto font-medium">
            <div className="text-sm">{appointment.value}</div>
            <div className={`text-xs ${
              appointment.status === "Confirmado" 
                ? "text-green-500" 
                : "text-yellow-500"
            }`}>
              {appointment.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
