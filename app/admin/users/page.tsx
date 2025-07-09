"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Users,
  UserRoundCog,
  IdCard,
  Phone,
  Mail,
  User,
  Building2,
  Briefcase,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { API } from "@/services/api";
import { toast } from "sonner";

interface ClientsType {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

interface Memberstype{
  id:string
  name: string;
  email: string;
  password: string;
  phone_number: string;
  super_admin_id: string;
};

// Mock data

// Client row component
function ClientRow({ client }: { client: ClientsType }) {
  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{client.name}</h3>
          <p className="text-sm text-muted-foreground">{client.email}</p>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Telefone</p>
          <p>{client.phone_number}</p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
// Team member row component
function TeamMemberRow({ member }: { member: Memberstype}) {
  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.email}</p>
        </div>
        <div className="flex items-center gap-2">

        </div>
      </div>
      <div className="mt-2 text-sm">
        <p className="text-muted-foreground">
          Último login:{" "}
        </p>
      </div>
    </div>
  );
}

// Form types
type ClientFormData = {
  name: string;
  email: string;
  document: string;
  phone_number: string;
  company_name: string;
};

type TeamMemberFormData = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  super_admin_id: string;
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("clients");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clients, setClients] = useState<ClientsType[]>([]);
  const [members, setMembers] = useState<Memberstype[]>([]);

  // Form states
  const [clientForm, setClientForm] = useState<ClientFormData>({
    name: "",
    email: "",
    document: "",
    phone_number: "",
    company_name: "",
  });

  const [teamMemberForm, setTeamMemberForm] = useState<TeamMemberFormData>({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    super_admin_id: "",
  });

  // Dialog handlers
  const openAddDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Enviando dados:", clientForm);

      const response = await API.post("/users", clientForm, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Resposta do servidor:", response.data);

      // Reset form and close dialog on success
      setClientForm({
        name: "",
        email: "",
        document: "",
        phone_number: "",
        company_name: "",
      });
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      if (error.response) {
        // A requisição foi feita e o servidor respondeu com um status fora do 2xx
        console.error("Resposta do servidor:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        console.error("Sem resposta do servidor:", error.request);
      } else {
        // Algum erro ocorreu ao montar a requisição
        console.error("Erro ao configurar a requisição:", error.message);
      }
    }
  };

  const handleTeamMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const memberResponse = await API.post("/admins", teamMemberForm);
      toast.success('Membro criado com sucesso', {
        description: `Bem vindo a equipe: ${teamMemberForm.name}`
      })
      setTeamMemberForm({
        name: "",
        email: "",
        password:"",
        phone_number: "",
        super_admin_id: "",
      })
    } catch (error: any) {
      toast.error(error.response.data.message)
      console.log(error.response.data.message)
    }
  };

  

  // Filter clients based on search
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone_number.includes(searchTerm)
  );

  // Filter team members based on search
  const filteredTeam = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  useEffect(() => {
    const searchClients = async () => {
      try {
        const resp = await API.get<ClientsType[]>("/users");
        console.log(resp.data);

        setClients(resp.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    searchClients();
  }, []);


  useEffect (() => {
    const searchMembers = async () => {
      try {
        const SearchingMembers = await API.get("/admins");
        setMembers(SearchingMembers.data)
      } catch (error: any) {
        console.log("Erro ao cadastrar Membro", error.data)
      }
    }
    searchMembers()
  },[handleTeamMemberSubmit])

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
              placeholder={`Buscar ${
                activeTab === "clients" ? "clientes..." : "membros..."
              }`}
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
                      onChange={(e) =>
                        setClientForm({ ...clientForm, name: e.target.value })
                      }
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
                      onChange={(e) =>
                        setClientForm({ ...clientForm, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document">CPF</Label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="document"
                      type="text"
                      maxLength={11}
                      placeholder="000.000.000-00"
                      className="pl-9"
                      value={clientForm.document}
                      onChange={(e) =>
                        setClientForm({
                          ...clientForm,
                          document: e.target.value,
                        })
                      }
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
                      value={clientForm.phone_number}
                      onChange={(e) =>
                        setClientForm({
                          ...clientForm,
                          phone_number: e.target.value,
                        })
                      }
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
                      value={clientForm.company_name || ""}
                      onChange={(e) =>
                        setClientForm({
                          ...clientForm,
                          company_name: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setTeamMemberForm({
                          ...teamMemberForm,
                          name: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setTeamMemberForm({
                          ...teamMemberForm,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
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
