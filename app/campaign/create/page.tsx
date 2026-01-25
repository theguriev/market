import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CampaignCreateForm } from "@/components/campaign-create-form";

export default async function CampaignCreatePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value || "";
  if (!token) redirect("/login");

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold">Створити кампанію</h1>
      <CampaignCreateForm />
    </div>
  );
}
