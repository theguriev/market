import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "@/lib/openapi/api-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface CampaignPageProps {
  params: {
    id: string;
  };
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value || "";
  if (!token) redirect("/login");

  try {
    // В реальном проекте здесь был бы API вызов
    // const campaign = await api.api(`/campaigns/${params.id}`, "get", {
    //   authorization: true,
    //   cookie: { accessToken: token }
    // });

    // Пока используем заглушку
    const mockCampaign = {
      id: params.id,
      title: "Sample Campaign",
      description: "This is a sample campaign description.",
      creator: {
        name: "Campaign Creator",
        avatar:
          "https://cdn.vyro.com/RYMzMLKd/channels4_profile_-_2025-10-08t130125_276-RYMzMLKd.png",
        fallback: "CC",
      },
      budget: 1000,
      platforms: ["youtube", "instagram"],
      status: "active",
      durationRange: [15, 60],
      ageRange: [18, 35],
      deadline: "2026-04-01",
    };

    return (
      <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage
              src={mockCampaign.creator.avatar}
              alt={mockCampaign.creator.name}
            />
            <AvatarFallback>{mockCampaign.creator.fallback}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{mockCampaign.title}</h1>
            <p className="text-muted-foreground">
              від {mockCampaign.creator.name}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Деталі кампанії</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Опис</h3>
                <p className="text-muted-foreground">
                  {mockCampaign.description}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Бюджет</h3>
                <p className="text-2xl font-bold">${mockCampaign.budget}</p>
              </div>
              <div>
                <h3 className="font-semibold">Статус</h3>
                <Badge
                  variant={
                    mockCampaign.status === "active" ? "default" : "secondary"
                  }
                >
                  {mockCampaign.status === "active" ? "Активна" : "Неактивна"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Вимоги</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Тривалість відео</h3>
                <p className="text-muted-foreground">
                  {mockCampaign.durationRange[0]} -{" "}
                  {mockCampaign.durationRange[1]} секунд
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Цільова аудиторія</h3>
                <p className="text-muted-foreground">
                  {mockCampaign.ageRange[0]} - {mockCampaign.ageRange[1]} років
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Платформи</h3>
                <div className="flex gap-2">
                  {mockCampaign.platforms.map((platform) => (
                    <Badge key={platform} variant="outline">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Дедлайн</h3>
                <p className="text-muted-foreground">{mockCampaign.deadline}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        <h1 className="text-2xl font-bold">Кампанію не знайдено</h1>
        <p className="text-muted-foreground">
          Можливо, кампанія була видалена або у вас немає доступу до неї.
        </p>
      </div>
    );
  }
}
