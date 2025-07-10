'use client'

import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react';


export default function Projects() {
  return(

  <div>
    <div className="flex justify-end">  
      <Button>
      <Plus/>
      Adicionar</Button>
    </div>
  </div>
  )
}