'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { api } from '@/lib/api'

interface Professional {
    id: string
    name: string
    avatar_url?: string
}

interface ProfessionalCarouselProps {
    onSelect: (id: string | null) => void
    selected: string | null
}

export function ProfessionalCarousel({ onSelect, selected }: ProfessionalCarouselProps) {
    const [professionals, setProfessionals] = useState<Professional[]>([])
    const [startIndex, setStartIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const itemsToShow = 3
    const hasNext = startIndex + itemsToShow < professionals.length
    const hasPrev = startIndex > 0

    useEffect(() => {
        const fetchProfessionals = async () => {
            setIsLoading(true)
            try {
                const data = await api.get('/professionals')
                setProfessionals(data)
            } catch (error) {
                console.error('Erro ao carregar profissionais:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfessionals()
    }, [])

    const handleNext = () => {
        if (hasNext) {
            setStartIndex(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        if (hasPrev) {
            setStartIndex(prev => prev - 1)
        }
    }

    if (isLoading) {
        return <div className="flex items-center justify-center">Carregando...</div>
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                disabled={!hasPrev}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
                {professionals
                    .slice(startIndex, startIndex + itemsToShow)
                    .map(professional => (
                        <Button
                            key={professional.id}
                            variant={selected === professional.id ? "default" : "outline"}
                            className="min-w-[120px]"
                            onClick={() => onSelect(professional.id)}
                        >
                            {professional.name}
                        </Button>
                    ))}
            </div>

            <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={!hasNext}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
