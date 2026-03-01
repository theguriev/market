import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ProfileSidebar } from "@/components/profile-sidebar";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="ml-[calc(var(--sidebar-width-icon)+1px)] min-h-screen">
        <div className="h-screen overflow-y-auto">
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
                <div className="container max-w-6xl">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold">Профіль</h1>
                    <p className="text-muted-foreground">
                      Керуйте налаштуваннями вашого облікового запису та
                      паролем.
                    </p>
                  </div>

                  <div className="flex gap-6">
                    <ProfileSidebar />
                    <div className="flex-1">{children}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
