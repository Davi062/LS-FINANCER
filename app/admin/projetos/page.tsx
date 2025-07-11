
"use client";

import { useEffect, useState } from "react";
import { ChevronsDown, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import API from "@/services/api";

interface projectsType {
  id: number
  admin_id: number | null
  user_id: number
  title: string
  description: string
  status: string
  start_date: string
  price: string
  updated_at: string
  user_name: string
  user_email: string
  user_phone_number: string
}

export default function Projects() {

 const [projects, setProjects] = useState<projectsType[]>([])

 useEffect( () =>  {



   const fetchProjects = async () =>{
   try {

    const response= await API.get<projectsType[]>("/projects")
    setProjects(response.data)

    
   } catch (error:any) {
    console.error(error.response)
   }

  }

  fetchProjects()

    console.log(projects)
 },[]) 

 console.log(projects)


  return (
    <div>

      <div className="flex justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="flex  bg-[#2664eb] text-white hover:bg-"
            >
              <Plus />
              Adicionar
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Projetos</SheetTitle>
              <SheetDescription>Crie seus projetos aqui</SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Client</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Clentes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usuário">Davi</SelectItem>
                    <SelectItem value="usuário">André</SelectItem>
                    <SelectItem value="usuário">Gabriel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Titulo do projeto</Label>
                <Input type="text" placeholder="Text" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Salvar Projeto</Button>
              <SheetClose asChild>
                <Button variant="outline">Cancelar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div> {/*Conteúdo André */}
        {projects.map((project) => (
          <Card className="m-5" key={project.id}>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>{project.title}</CardTitle>
                  <p className="pt-[5px]">{project.user_name}</p>
                </div>
                <Badge variant="secondary">{project.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-[30px] mb-4">
                <div>
                  <p>Data para entrega</p>
                  <p>{new Date(project.updated_at).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <p>Valor</p>
                  <p>R$ {parseFloat(project.price).toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <ChevronsDown /> Ver mais
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full md:w-[90%]">
                  <DialogHeader className="flex flex-col md:flex-row justify-between p-4 gap-4">
                    {/* Caixa da esquerda */}
                    <div className="w-full md:w-[48%] p-4 border rounded">
                      <p className="font-semibold mb-2">Dados do cliente</p>
                      <p>{project.user_name}</p>
                      <p>{project.user_email}</p>
                      <p>{project.user_phone_number}</p>
                    </div>

                    {/* Caixa da direita */}
                    <div className="w-full md:w-[48%] p-4 border rounded">
                      <Badge variant="secondary" className="mb-2">{project.status}</Badge>
                      <DialogTitle>{project.title}</DialogTitle>
                      <DialogDescription className="mt-2">
                        <p>{project.description}</p>
                      </DialogDescription>

                      <div className="mt-4 space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Data de início</p>
                          <p>{new Date(project.start_date).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Última atualização</p>
                          <p>{new Date(project.updated_at).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="p-4 border-t">
                    <p className="text-2xl font-bold">R$ {parseFloat(project.price).toFixed(2).replace('.', ',')}</p>
                  </div>
                  
                  <DialogFooter className="flex justify-between items-center border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                      Criado em: {new Date(project.updated_at).toLocaleDateString('pt-BR')}
                    </p>
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" /> Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}


