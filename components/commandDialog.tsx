"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Wallet,
  Users,
  DollarSign,
  ShoppingBag,
  Code2,
  Settings,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import CommandLink from "@/components/commandLink";

const commands = [
  {
    heading: "Menu Principal",
    items: [
      { href: "/", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/schedule", icon: Calendar, label: "Agenda" },
      { href: "/appointments", icon: MessageSquare, label: "Atendimentos" },
      { href: "/transactions", icon: Wallet, label: "Fluxo de caixa" },
      { href: "/team", icon: Users, label: "Equipe" },
      { href: "/clients", icon: User, label: "Clientes" },
      { href: "/financeiro", icon: DollarSign, label: "Financeiro" },
      { href: "/produtos", icon: ShoppingBag, label: "Produtos" },
      { href: "/integracoes", icon: Code2, label: "Integrações" },
      { href: "/configuracoes", icon: Settings, label: "Configurações" },
    ],
  },
];

interface CommandDialogDemoProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandDialogDemo({ isOpen, onOpenChange }: CommandDialogDemoProps = {}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  
  const open = isOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  return (
    <>
      <p className="fixed hidden xl:block bottom-0 right-0 p-6 text-sm text-muted-foreground">
        Pressione{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Procure..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          {commands.map((group) => (
            <React.Fragment key={group.heading}>
              <CommandGroup heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem key={item.href} onSelect={() => setOpen(false)}>
                    <CommandLink href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </CommandLink>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
