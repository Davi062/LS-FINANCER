"use client"

import * as React from "react"
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
