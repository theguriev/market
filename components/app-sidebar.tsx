"use client";

import { SidebarProfile } from "@/components/sidebar/nav-profile";
import { NavMore } from "@/components/sidebar/nav-more";
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
    <Sidebar
      collapsible="icon"
      className="border-none"
      {...props}
    >
      <SidebarHeader className="flex flex-row p-2">
        <SidebarMenuButton asChild className="hover:bg-transparent hover:text-current h-auto p-0">
          <Link href="/" className="flex items-center gap-2 px-2 py-1.5 ">
            <Logo />
            <span className="text-xl font-bold tracking-tight">
              Creotik
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/"}
                  tooltip="Головна"
                  className="h-12 [&>svg]:size-6"
                >
                  <Link href="/" className="flex items-center gap-4 text-base font-medium">
                    <Home className="shrink-0" />
                    <span className="truncate">Головна</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/campaign/create")}
                  tooltip="Додати кліп"
                  className="h-12 [&>svg]:size-6"
                >
                  <Link href="/campaign/create" className="flex items-center gap-4 text-base font-medium">
                    <PlusCircle className="shrink-0" />
                    <span className="truncate">Додати кліп</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/earn")}
                  tooltip="Заробіток"
                  className="h-12 [&>svg]:size-6"
                >
                  <Link href="/earn" className="flex items-center gap-4 text-base font-medium">
                    <Wallet className="shrink-0" />
                    <span className="truncate">Заробіток</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarProfile />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <NavMore />
      </SidebarFooter>
    </Sidebar>
  );
}
