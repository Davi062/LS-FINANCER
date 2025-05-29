"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  CircleDollarSign,
  Command,
  ContactRound,
  LifeBuoy,
  CalendarDays,
  Scissors,
  Send,
  Settings2,
  CodeXml,
  UsersRound,
  ShoppingCart,
  BanknoteIcon,
  Home,
  LayoutDashboard,
  MessageSquare,
  GraduationCap,
  ArrowRight
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"

import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar
} from "@/components/ui/sidebar"

const data = {
  teams: [
    {
      name: "lnkSYS",
      logo: Command,
      plan: "Barber Shop",
    }
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Visão geral",
          url: "#",
        }
      ],
    },
    {
      title: "Agenda",
      url: "/schedule",
      icon: CalendarDays,
      items: [
        {
          title: "Visão geral",
          url: "#",
        }
      ],
    },
    {
      title: "Atendimentos",
      url: "/appointments/config",
      icon: MessageSquare,
      items: [
        {
          title: "Visão geral",
          url: "/appointments",
        },
        {
          title: "Configurações",
          url: "/appointments/config",
        }
      ],
    },
    {
      title: "Financeiro",
      url: "/financial",
      icon: CircleDollarSign,
      items: [
        {
          title: "Fluxo de Caixa",
          url: "/financial/transactions",
        },
        {
          title: "Comandas",
          url: "/financial/commands",
        },
      ],
    },
    {
      title: "Equipe",
      url: "/team",
      icon: UsersRound,
      items: [
        {
          title: "Cronograma de hórarios",
          url: "/team/schedule"
        },
        {
          title: "Serviços",
          url: "/team/services"
        },
        {
          title: "Comissões",
          url: "/team/commissions"
        }
      ],
    },
    {
      title: "Clientes",
      url: "/clients",
      icon: ContactRound,
      items: [
        {
          title: "Planos",
          url: "/clients/plans",
        },
        {
          title: "Assinaturas",
          url: "/clients/signatures",
        }
      ],
    },
    {
      title: "Produtos",
      url: "/products",
      icon: ShoppingCart,
      items: [
        {
          title: "Visão geral",
          url: "/products"
        }
      ],
    },  
    {
      title: "Integrações",
      url: "/integrations",
      icon: CodeXml,
      items: [
        {
          title: "Gerais",
          url: "/integrations",
        }
      ],
    },

    {
      title: "Configurações",
      url: "/config",
      icon: Settings2,
      items: [
        {
          title: "Gerais",
          url: "/config",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Suporte",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Salao 3",
      url: "#",
      icon: Scissors,
      active: true
    },
    {
      name: "Salao 2",
      url: "#",
      icon: Scissors,
    },
    {
      name: "Salao 3",
      url: "#",
      icon: Scissors,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const { state: sidebarState } = useSidebar()

  // Atualiza os itens do menu com base na rota atual
  const navMainWithActive = React.useMemo(() => {
    return data.navMain.map(item => {
      // Verifica se é a rota exata ou uma subrota, mas apenas se não for a rota raiz
      const isActive = item.url === '/' 
        ? pathname === '/'
        : Boolean(pathname && pathname.startsWith(item.url));

      return {
        ...item,
        isActive,
        items: item.items?.map(subItem => ({
          ...subItem,
          isActive: Boolean(pathname && pathname === subItem.url)
        }))
      }
    })
  }, [pathname])

  // Handler para navegação direta quando a sidebar está fechada
  const handleSidebarItemClick = React.useCallback((url: string, event: React.MouseEvent) => {
    if (sidebarState === "collapsed") {
      event.preventDefault();
      router.push(url);
    }
  }, [sidebarState, router]);

  // Modificar os componentes para usar o handler
  const navMainWithClickHandler = React.useMemo(() => {
    return navMainWithActive.map(item => ({
      ...item,
      onClick: (e: React.MouseEvent) => handleSidebarItemClick(item.url, e)
    }))
  }, [navMainWithActive, handleSidebarItemClick]);

  // Modificar os projetos para usar o handler
  const projectsWithClickHandler = React.useMemo(() => {
    return data.projects.map(item => ({
      ...item,
      onClick: (e: React.MouseEvent) => handleSidebarItemClick(item.url, e)
    }))
  }, [data.projects, handleSidebarItemClick]);

  // Modificar os itens secundários para usar o handler
  const navSecondaryWithClickHandler = React.useMemo(() => {
    return data.navSecondary.map(item => ({
      ...item,
      onClick: (e: React.MouseEvent) => handleSidebarItemClick(item.url, e)
    }))
  }, [data.navSecondary, handleSidebarItemClick]);

  return (
    <Sidebar 
      collapsible="icon" 
      className="shadow-[5px_0_15px_-3px_rgba(0,0,0,0.1)]" 
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="flex flex-col h-full pt-1">
        <NavMain items={navMainWithClickHandler} />
        <div className="flex-1 min-h-4" />
        <div className="border-t border-gray-100/10 dark:border-gray-800/50">
          <NavSecondary items={navSecondaryWithClickHandler} />
        </div>
        
        {/* Banner de Assinatura de Curso - Apenas quando expandido */}
        {sidebarState === "expanded" && (
          <div className="mt-2 mx-3 mb-4 p-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
            <div className="flex items-center mb-2">
              <GraduationCap className="h-5 w-5 mr-2" />
              <h3 className="font-bold">Curso Master Barber</h3>
            </div>
            <p className="text-sm mb-3 text-blue-100">Aprenda técnicas avançadas e aumente seu faturamento em até 3x</p>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded">50% OFF</span>
              <button className="flex items-center text-xs font-semibold bg-white text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                Assinar
                <ArrowRight className="h-3 w-3 ml-1" />
              </button>
            </div>
          </div>
        )}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
