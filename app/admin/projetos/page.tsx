
"use client";

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

export default function Projects() {

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
        <Card className="m-5">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Título do Projeto</CardTitle>
                <p className="pt-[5px]">Nome do cliente</p>
              </div>
              <Badge variant={"secondary"}>Ativo</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-[30px] mb-4">
              <div>
                Data para entrega
                <p>20/07/2025</p>
              </div>
              <div>
                <p>Valor</p>
                <p>50,00</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <ChevronsDown /> Ver mais
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">

                <DialogHeader>
                  <div>
                    <DialogTitle>Título do projeto</DialogTitle>
                  </div>
                  <div>
                    <p>João da Silva</p>
                    <p>joao.silva@example.com</p>
                    <p>+55 62 98429-0296</p>
                  </div>
                  <DialogDescription>
                    <p>Descrições do projeto serão definidas aqui.</p>
                  </DialogDescription>

                  <Badge variant={"secondary"}>Ativo</Badge>

                </DialogHeader>

                <div> {/*datas*/}
                  <div>
                    <p>Data de início</p>
                    <p>22/07/2025</p>
                  </div>

                  <div>
                    <p>Data para entrega</p>
                    <p>15/08/2025</p>
                  </div>
                </div>

                <div>
                  <p>$5.000</p>
                </div>
                <DialogFooter className="flex justify-between">

                  <Button type="submit"><Save /> Save change</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </CardContent>
        </Card>
      </div>


    </div>
  );
}


