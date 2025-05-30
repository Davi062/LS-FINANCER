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
  
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
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
      icon: PieChart,
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
      url: "/projetos",
      icon: ScrollText,
      items: [
        {
          title: "Projetos",
          url: "/projetos",
          icon: ScrollText,
        },
      ],
    },
    {
      title: "Usuários",
      url: "/usuarios",
      icon: User,
      items: [
        {
          title: "Usuários",
          url: "/usuarios",
          icon: User,
        },
      ],
    },
    {
     title: "Settings",
     url: "/settings",
     icon: Settings2,
     items: [
       {
         title: "Settings",
         url: "/settings",
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
