"use client";

import * as React from "react";
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
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavSecondary } from "./nav-secondary";
import { Item } from "@radix-ui/react-dropdown-menu";
import { title } from "process";
import { cn } from "@/lib/utils";

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
    },
    {
      title: "Projetos",
      url: "/admin/projetos",
      icon: ScrollText,
    },
    {
      title: "Usuários",
      url: "/admin/users",
      icon: User,
    },
    {
      title: "Configurações",
      url: "/admin/settings",
      icon: Settings2,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  className?: string;
}

export function AppSidebar({ className, ...props }: AppSidebarProps) {
  return (
    <Sidebar 
      collapsible="icon" 
      className={cn("h-full bg-background", className)}
      {...props}
    >
      <div className="flex flex-col h-full">
        <SidebarHeader className="border-b p-4">
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <div className="flex-1 overflow-y-auto">
          <SidebarContent className="p-2">
            <NavSecondary items={data.items} />
          </SidebarContent>
        </div>
        <SidebarFooter className="p-4 border-t">
          <NavUser user={data.user} />
        </SidebarFooter>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
