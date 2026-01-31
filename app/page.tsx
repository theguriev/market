import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PublicCampaigns } from "@/components/public-campaigns";
import { UserCampaigns } from "@/components/user-campaigns";
import { CampaignCreateForm } from "@/components/campaign-create-form";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value || "";
  if (!token) {
    redirect("/login");
  }
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Створення вашого застосунку
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Отримання даних</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="flex-1 rounded-xl md:min-h-min p-4 border bg-background">
            <Suspense
              fallback={
                <div className="space-y-3">
                  <Skeleton className="h-6 w-48" />
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                  </div>
                </div>
              }
            >
              <PublicCampaigns />
            </Suspense>
          </div>

          <div className="flex-1 rounded-xl md:min-h-min p-4 border bg-background">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Створити кампанію</h2>
              <CampaignCreateForm />
            </div>
            <Suspense
              fallback={
                <div className="space-y-3">
                  <Skeleton className="h-6 w-56" />
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                  </div>
                </div>
              }
            >
              <UserCampaigns />
            </Suspense>
          </div>
          <div className="flex-1 rounded-xl md:min-h-min p-4 border bg-background">
            <Suspense
              fallback={
                <div className="space-y-3">
                  <Skeleton className="h-6 w-56" />
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                  </div>
                </div>
              }
            >
              <UserCampaigns />
            </Suspense>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
