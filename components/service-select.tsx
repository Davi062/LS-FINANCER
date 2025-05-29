'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Service {
    id: string
    name: string
}

interface ServiceSelectProps {
    value: string
    onChange: (value: string) => void
    services: Service[]
}

export function ServiceSelect({ value, onChange, services }: ServiceSelectProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="Selecione um serviço" />
            </SelectTrigger>
            <SelectContent>
                {services.map(service => (
                    <SelectItem key={service.id} value={service.id}>
                        {service.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
