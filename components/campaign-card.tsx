import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

type Platform = "youtube" | "instagram" | "x" | "tiktok";

interface CampaignCardProps {
  avatar: { src: string; alt: string; fallback: string };
  name: string;
  timeText: string;
  title: string;
  platforms: Platform[];
  price: number;
  currency?: string; // default: USD
  unitLabel?: string; // default: "за 1М переглядів"
}

const platformIconMap: Record<
  Platform,
  ComponentType<{ className?: string; "aria-label"?: string }>
> = {
  youtube: IconBrandYoutube,
  instagram: IconBrandInstagram,
  x: IconBrandX,
  tiktok: IconBrandTiktok,
};

export function CampaignCard({
  avatar,
  name,
  timeText,
  title,
  platforms,
  price,
  currency = "USD",
  unitLabel = "за 1М переглядів",
}: CampaignCardProps) {
  const formattedPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Avatar className="size-10 rounded-md">
            <AvatarImage src={avatar.src} alt={avatar.alt} />
            <AvatarFallback>{avatar.fallback}</AvatarFallback>
          </Avatar>
          <div>
            <div>
              <div className="flex items-center gap-2">
                <CardDescription>{name}</CardDescription>
              </div>
              <div className="text-xs text-muted-foreground">{timeText}</div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <span>{title}</span>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="flex justify-between w-full items-end">
          <div className="mt-1 flex items-center gap-2 text-muted-foreground">
            {platforms.map((platformId) => {
              const Icon = platformIconMap[platformId];
              const ariaLabel =
                platformId === "x"
                  ? "X"
                  : platformId.charAt(0).toUpperCase() + platformId.slice(1);
              return (
                <Icon
                  key={platformId}
                  className="size-4"
                  aria-label={ariaLabel}
                />
              );
            })}
          </div>
          <div className="flex flex-col items-end">
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {formattedPrice}
            </CardTitle>
            <span className="text-xs text-muted-foreground leading-none">
              {unitLabel}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
