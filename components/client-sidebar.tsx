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
import { NavSecondary } from "./nav-secondary"

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
      url: "/client",
      icon: LayoutDashboard,
      items: [
        {
          title: "Dashboard",
          url: "/client",
          icon: PieChart,
        },
      ],
    },
    {
      title: "Meusprojetos",
      url: "/client/myprojects",
      icon: ScrollText,
      items: [
        {
          title: "Meusprojetos",
          url: "/client/myprojects",
          icon: ScrollText,
        },
      ],
    },
    {
     title: "Configurações",
     url: "/client/settingsclient",
     icon: Settings2,
     items: [
       {
         title: "Configurações",
         url: "/client/settingsclient",
         icon: Settings2,
       },
     ],
    }
  ],
}

export function ClientSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
