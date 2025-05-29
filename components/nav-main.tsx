"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { useRouter } from 'next/navigation'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    onClick?: (e: React.MouseEvent) => void
    items?: {
      title: string
      url: string
      isActive?: boolean
    }[]
  }[]
}) {
  const { state } = useSidebar();
  const router = useRouter();

  const handleItemClick = (e: React.MouseEvent, url: string) => {
    // Se o clique foi na seta, apenas deixa o comportamento padrão do Collapsible
    if ((e.target as HTMLElement).closest('.chevron-icon')) {
      return;
    }

    // Se não foi na seta, navega para a URL
    e.preventDefault();
    router.push(url);
  };
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton 
                  tooltip={item.title} 
                  onClick={(e) => handleItemClick(e, item.url)}
                  className={`${item.isActive ? 'bg-[#236F5D]/10 text-[#236F5D] border-l-4 border-[#236F5D] pl-[calc(0.75rem-4px)]' : ''} hover:bg-transparent`}
                >
                  {item.icon && <item.icon className={item.isActive ? 'text-[#236F5D]' : ''} />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 chevron-icon" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton 
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(subItem.url);
                        }}
                        className={`${subItem.isActive ? 'bg-[#236F5D]/10 text-[#236F5D] border-l-4 border-[#236F5D] pl-[calc(0.75rem-4px)]' : ''} hover:bg-transparent`}
                      >
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
