"use client";

import { cn } from "@/lib/utils";
import { User, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const profileSections = [
  {
    id: "profile",
    title: "Загальна інформація",
    icon: User,
    href: "/profile",
  },
  {
    id: "security",
    title: "Безпека",
    icon: Shield,
    href: "/profile/security",
  },
];

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-muted/10 pr-4 pt-4">
      <div className="space-y-1">
        {profileSections.map((section) => {
          const Icon = section.icon;
          const isActive = pathname === section.href;

          return (
            <Link
              key={section.id}
              href={section.href}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-muted",
                isActive ? "bg-muted text-foreground" : "text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
              {section.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
