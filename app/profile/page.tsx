import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ProfileForm } from "@/components/profile-form";
import { ChangePasswordForm } from "@/components/change-password-form";
import { ProfileSidebar } from "@/components/profile-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: { section?: string };
}) {
  // Server-side auth check
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) {
    redirect("/login");
  }

  const currentSection = searchParams.section || "profile";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
              <div className="container max-w-6xl">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold">Профіль</h1>
                  <p className="text-muted-foreground">
                    Керуйте налаштуваннями вашого облікового запису та паролем.
                  </p>
                </div>

                <div className="flex gap-6">
                  <ProfileSidebar />

                  <div className="flex-1">
                    {currentSection === "profile" && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold">
                            Інформація профілю
                          </h2>
                          <p className="text-muted-foreground mt-2">
                            Оновіть свою особисту інформацію та налаштування
                            облікового запису.
                          </p>
                        </div>
                        <Suspense fallback={<ProfileFormSkeleton />}>
                          <ProfileForm />
                        </Suspense>
                      </div>
                    )}

                    {currentSection === "security" && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold">
                            Зміна пароля
                          </h2>
                          <p className="text-muted-foreground mt-2">
                            Оновіть пароль для забезпечення безпеки вашого
                            облікового запису.
                          </p>
                        </div>
                        <Suspense fallback={<ChangePasswordFormSkeleton />}>
                          <ChangePasswordForm />
                        </Suspense>
                      </div>
                    )}
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

function ProfileFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="size-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-3 w-[150px]" />
        </div>
      </div>
      <Separator />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[40px]" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[70px]" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
      <Skeleton className="h-9 w-[120px]" />
    </div>
  );
}

function ChangePasswordFormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[140px]" />
        <Skeleton className="h-9 w-full" />
      </div>
      <Skeleton className="h-9 w-[120px]" />
    </div>
  );
}
