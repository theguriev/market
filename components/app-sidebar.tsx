"use client";

import { SidebarUserPanel } from "@/components/sidebar/user-panel";
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Home, PlusCircle, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentProps, Suspense } from "react";
import { Logo } from "./ui/logo";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row">
        <SidebarMenuButton asChild tooltip="Toggle sidebar">
          <Link href="/">
            <Logo className="size-5" />
            <span className="group-data-[collapsible=icon]:hidden">Creotik</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Головна">
                  <Link href="/">
                    <Home className="size-4 shrink-0" />
                    <span className="truncate">Головна</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Додати кліп">
                  <Link href="/campaign/create">
                    <PlusCircle className="size-4 shrink-0" />
                    <span className="truncate">Додати кліп</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/earn")}
                  tooltip="Заробіток"
                >
                  <Link href="/earn">
                    <Wallet className="size-4 shrink-0" />
                    <span className="truncate">Заробіток</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
