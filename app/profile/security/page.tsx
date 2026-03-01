import { Suspense } from "react";
import { ChangePasswordForm } from "@/components/change-password-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Зміна пароля</h2>
        <p className="text-muted-foreground mt-2">
          Оновіть пароль для забезпечення безпеки вашого облікового запису.
        </p>
      </div>
      <Suspense fallback={<ChangePasswordFormSkeleton />}>
        <ChangePasswordForm />
      </Suspense>
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
