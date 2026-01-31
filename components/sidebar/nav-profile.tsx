"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@/hooks/use-user"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

function NavProfileContent({ user }: { user: { name: string; avatar: string } }) {
  const pathname = usePathname()
  const isActive = pathname === "/profile"

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip="Профіль"
        className="h-12 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Link href="/profile" className="flex items-center gap-4">
          <Avatar className="h-6 w-6 shrink-0">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="truncate text-base font-medium">Профіль</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function ProfileLoader() {
  const user = useUser()
  return <NavProfileContent user={user} />
}

export function SidebarProfile() {
  return (
    <Suspense fallback={<SidebarMenuItem><Skeleton className="h-10 w-full rounded-lg" /></SidebarMenuItem>}>
      <ProfileLoader />
    </Suspense>
  )
}
