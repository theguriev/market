"use client";

import { useUser } from "@/hooks/use-user";
import { Home, PlusCircle, Wallet } from "lucide-react";
import Link from "next/link";
import { ComponentProps, Suspense } from "react";
import { Logo } from "./ui/logo";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarUserPanel } from "./sidebar/user-panel";
import { Skeleton } from "./ui/skeleton";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="fixed left-0 top-0 h-screen w-[calc(var(--sidebar-width-icon)+1px)]! border-r overflow-hidden z-40"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <Link href="/">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Logo className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Creotik</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              <Suspense fallback={<NavigationSkeleton />}>
                <NavigationItems />
              </Suspense>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<Skeleton className="h-10 rounded-lg" />}>
          <SidebarUserPanel />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}

function NavigationItems() {
  const user = useUser();

  // Base navigation items that all users can see
  const baseNavItems = [
    {
      title: "Головна",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Заробіток",
      url: "/earn",
      icon: Wallet,
      isActive: false,
    },
  ];

  // Items only for companies (advertisers)
  const companyOnlyItems = [
    {
      title: "Створити кампанію",
      url: "/campaign/create",
      icon: PlusCircle,
      isActive: false,
    },
  ];

  // Combine navigation based on user role
  const navItems =
    user.role === "company"
      ? [
          ...baseNavItems.slice(0, 1),
          ...companyOnlyItems,
          ...baseNavItems.slice(1),
        ]
      : baseNavItems;

  return (
    <>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            tooltip={{
              children: item.title,
              hidden: false,
            }}
            asChild
            className="px-2.5 md:px-2"
          >
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}

function NavigationSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <SidebarMenuItem key={i}>
          <Skeleton className="h-8 rounded-md" />
        </SidebarMenuItem>
      ))}
    </>
  );
}
