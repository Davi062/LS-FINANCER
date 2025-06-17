"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  Users, 
  UserRoundCog, 
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  X,
  Phone,
  Mail,
  User,
  Building2,
  Briefcase
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

// Form types
type ClientFormData = {
  name: string;
  email: string;
  phone: string;
  company?: string;
};

type TeamMemberFormData = {
  name: string;
  email: string;
  role: string;
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("clients");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form states
  const [clientForm, setClientForm] = useState<ClientFormData>({
    name: "",
    email: "",
    phone: "",
    company: ""
  });
  
  const [teamMemberForm, setTeamMemberForm] = useState<TeamMemberFormData>({
    name: "",
    email: "",
    role: ""
  });
  
  // Dialog handlers
  const openAddDialog = () => {
    setIsDialogOpen(true);
  };
  
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  
  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log("New client:", clientForm);
    // Reset form and close dialog
    setClientForm({ name: "", email: "", phone: "", company: "" });
    setIsDialogOpen(false);
  };
  
  const handleTeamMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log("New team member:", teamMemberForm);
    // Reset form and close dialog
    setTeamMemberForm({ name: "", email: "", role: "" });
    setIsDialogOpen(false);
  };

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
        <Button onClick={openAddDialog}>
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
      
      {/* Add Client/Team Member Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {activeTab === "clients" ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Novo Cliente
                </DialogTitle>
                <DialogDescription>
                  Adicione um novo cliente ao sistema
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleClientSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Nome do cliente"
                      className="pl-9"
                      value={clientForm.name}
                      onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@exemplo.com"
                      className="pl-9"
                      value={clientForm.email}
                      onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className="pl-9"
                      value={clientForm.phone}
                      onChange={(e) => setClientForm({...clientForm, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa (Opcional)</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="company"
                      placeholder="Nome da empresa"
                      className="pl-9"
                      value={clientForm.company || ""}
                      onChange={(e) => setClientForm({...clientForm, company: e.target.value})}
                    />
                  </div>
                </div>
                
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={closeDialog}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Cliente
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <UserRoundCog className="h-5 w-5" />
                  Adicionar Membro à Equipe
                </DialogTitle>
                <DialogDescription>
                  Adicione um novo membro à sua equipe
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleTeamMemberSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="member-name">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="member-name"
                      placeholder="Nome do membro"
                      className="pl-9"
                      value={teamMemberForm.name}
                      onChange={(e) => setTeamMemberForm({...teamMemberForm, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="member-email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="member-email"
                      type="email"
                      placeholder="email@empresa.com"
                      className="pl-9"
                      value={teamMemberForm.email}
                      onChange={(e) => setTeamMemberForm({...teamMemberForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo</Label>
                  <Select
                    value={teamMemberForm.role}
                    onValueChange={(value) => setTeamMemberForm({...teamMemberForm, role: value})}
                  >
                    <SelectTrigger className="w-full">
                      <Briefcase className="h-4 w-4 text-muted-foreground mr-2" />
                      <SelectValue placeholder="Selecione o cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Desenvolvedor">Desenvolvedor</SelectItem>
                      <SelectItem value="Designer">Designer</SelectItem>
                      <SelectItem value="Gerente">Gerente</SelectItem>
                      <SelectItem value="Analista">Analista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={closeDialog}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Membro
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}