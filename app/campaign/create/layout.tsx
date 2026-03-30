import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function CampaignCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="ml-[calc(var(--sidebar-width-icon)+1px)] min-h-screen">
        <div className="h-screen overflow-y-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
