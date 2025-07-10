"use client";

import { Plus } from "lucide-react";
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

export default function Projects() {
  return (
    <div>
      <div className="flex justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="bg-[#2664eb] text-white hover:bg-"
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
    </div>
  );
}
