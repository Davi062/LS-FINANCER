"use client"

import * as React from "react"
import { useAuth } from "@/contexts/auth-context"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  BriefcaseBusiness,
  ScrollText,
  User,
  DollarSign,
  LayoutDashboard,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Link Finanças",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  items: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
      items: [
        {
          title: "Dashboard",
          url: "/admin",
          icon: PieChart,
        },
      ],
    },
    {
      title: "Projetos",
      url: "/admin/projetos",
      icon: ScrollText,
      items: [
        {
          title: "Projetos",
          url: "/admin/projetos",
          icon: ScrollText,
        },
      ],
    },
    {
      title: "Usuários",
      url: "/admin/users",
      icon: User,
      items: [
        {
          title: "Usuários",
          url: "/admin/users",
          icon: User,
        },
      ],
    },
    {
     title: "Configurações",
     url: "/admin/settings",
     icon: Settings2,
     items: [
       {
         title: "Configurações",
         url: "/admin/settings",
         icon: Settings2,
       },
     ],
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()
  
  if (!user) return null
  
  // Update the user data with the authenticated user
  const sidebarData = {
    ...data,
    user: {
      ...data.user,
      name: user.name,
      email: user.email,
      avatar: user.avatar || data.user.avatar
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
