"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Users, 
  UserRoundCog, 
  MoreHorizontal,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock data
const clients = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    phone: "(11) 98765-4321",
    status: "Ativo",
    projects: 3,
    lastAccess: "2025-06-01T14:30:00Z"
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@example.com",
    phone: "(11) 98765-1234",
    status: "Inativo",
    projects: 1,
    lastAccess: "2025-05-15T10:15:00Z"
  },
];

const teamMembers = [
  {
    id: "1",
    name: "Carlos Oliveira",
    email: "carlos@empresa.com",
    role: "Desenvolvedor",
    status: "Ativo",
    lastLogin: "2025-06-02T09:45:00Z"
  },
  {
    id: "2",
    name: "Ana Costa",
    email: "ana@empresa.com",
    role: "Designer",
    status: "Ativo",
    lastLogin: "2025-06-01T16:20:00Z"
  },
];

// Client row component
function ClientRow({ client }: { client: typeof clients[0] }) {
  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{client.name}</h3>
          <p className="text-sm text-muted-foreground">{client.email}</p>
        </div>
        <Badge
          variant={client.status === "Ativo" ? "default" : "secondary"}
          className={client.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
        >
          {client.status}
        </Badge>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Telefone</p>
          <p>{client.phone}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Projetos</p>
          <p>{client.projects}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Último Acesso</p>
          <p>{format(new Date(client.lastAccess), "dd/MM/yyyy 'às' HH:mm")}</p>
        </div>
      </div>
    </div>
  );
}

// Team member row component
function TeamMemberRow({ member }: { member: typeof teamMembers[0] }) {
  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{member.role}</Badge>
          <Badge
            variant={member.status === "Ativo" ? "default" : "secondary"}
            className={member.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
          >
            {member.status}
          </Badge>
        </div>
      </div>
      <div className="mt-2 text-sm">
        <p className="text-muted-foreground">
          Último login: {format(new Date(member.lastLogin), "dd/MM/yyyy 'às' HH:mm")}
        </p>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("clients");

  // Filter clients based on search
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  // Filter team members based on search
  const filteredTeam = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie seus clientes e equipe em um só lugar
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {activeTab === "clients" ? "Novo Cliente" : "Adicionar Membro"}
        </Button>
      </div>

      <Tabs 
        defaultValue="clients" 
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <UserRoundCog className="h-4 w-4" />
              Equipe
            </TabsTrigger>
          </TabsList>
          
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={`Buscar ${activeTab === 'clients' ? 'clientes...' : 'membros...'}`}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clientes</CardTitle>
              <CardDescription>
                Gerencie seus clientes e visualize seus dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredClients.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum cliente encontrado
                  </div>
                ) : (
                  filteredClients.map((client) => (
                    <ClientRow key={client.id} client={client} />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipe</CardTitle>
              <CardDescription>
                Gerencie os membros da sua equipe e suas permissões
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTeam.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum membro da equipe encontrado
                  </div>
                ) : (
                  filteredTeam.map((member) => (
                    <TeamMemberRow key={member.id} member={member} />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}