'use client'

import { Button } from "@/components/ui/button"
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
import { Plus, Save } from 'lucide-react';


export default function Projects() {

  return (
    <div>
      <div className="flex justify-end">
        <Button>
          <Plus />
          Adicionar</Button>
      </div>

      <Card className="mt-5">
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
              <Button>Ver mais</Button>
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
  )
}