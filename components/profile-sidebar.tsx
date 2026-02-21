"use client";

import { cn } from "@/lib/utils";
import { User, Shield } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

const profileSections = [
  {
    id: "profile",
    title: "Загальна інформація",
    icon: User,
  },
  {
    id: "security",
    title: "Безпека",
    icon: Shield,
  },
];

export function ProfileSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentSection = searchParams.get("section") || "profile";

  const handleSectionChange = (sectionId: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("section", sectionId);
    router.push(url.toString());
  };

  return (
    <div className="w-64 bg-muted/10 p-4">
      <div className="space-y-1">
        {profileSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => handleSectionChange(section.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-muted",
                currentSection === section.id
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
              {section.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
