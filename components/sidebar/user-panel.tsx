"use client";

import { useUser } from "@/hooks/use-user";
import { NavUser } from "@/components/nav-user";

export function SidebarUserPanel() {
  const user = useUser();
  return <NavUser user={user} />;
}
