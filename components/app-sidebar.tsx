"use client";

import * as React from "react";
import { Suspense } from "react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { TeamSwitcher } from "@/components/team-switcher";
import { SidebarUserPanel } from "@/components/sidebar/user-panel";
import { sidebarData } from "@/components/sidebar/data";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Logo } from "./ui/logo";
import Link from "next/link";
import { PlusCircle, Wallet } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row">
        <SidebarMenuButton asChild tooltip="Головна">
          <Link href="/">
            <Logo className="size-5" />
            <span className="group-data-[collapsible=icon]:hidden">
              Creotik
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton asChild>
                <Link href="/campaign/create">
                  <PlusCircle className="size-4 shrink-0" />
                  <span className="truncate">Додати кліп</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link href="/earn">
                  <Wallet className="size-4 shrink-0" />
                  <span className="truncate">Заробіток</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<Skeleton className="h-10 rounded-lg" />}>
          <SidebarUserPanel />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
