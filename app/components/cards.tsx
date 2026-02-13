import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CampaignCards({
  totalEarnings = 0,
  videoClipCount = 0,
}: {
  totalEarnings?: number;
  videoClipCount?: number;
}) {
  const averagePerClip =
    videoClipCount > 0 ? totalEarnings / videoClipCount : 0;
  const formattedAveragePerClip = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(averagePerClip);
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-start gap-3">
            <Avatar className="size-10 rounded-md">
              <AvatarImage
                src="https://placehold.co/80x80?text=MB"
                alt="MrBeast"
              />
              <AvatarFallback>MB</AvatarFallback>
            </Avatar>
            <div>
              <div>
                <div className="flex items-center gap-2">
                  <CardDescription>MrBeast</CardDescription>
                </div>
                <div className="text-xs text-muted-foreground">
                  17 годин тому
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">
            Big Game Commercial: Salesforce
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex justify-between w-full items-end">
            <div className="mt-1 flex items-center gap-2 text-muted-foreground">
              <IconBrandYoutube className="size-4" aria-label="YouTube" />
              <IconBrandInstagram className="size-4" aria-label="Instagram" />
              <IconBrandX className="size-4" aria-label="X" />
            </div>
            <div className="flex flex-col items-end">
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                $1000.00
              </CardTitle>
              <span className="text-xs text-muted-foreground leading-none">
                за 1М переглядів
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-start gap-3">
            <Avatar className="size-10 rounded-md">
              <AvatarImage
                src="https://placehold.co/80x80?text=WN"
                alt="Whatnot"
              />
              <AvatarFallback>WN</AvatarFallback>
            </Avatar>
            <div>
              <div>
                <div className="flex items-center gap-2">
                  <CardDescription>Whatnot</CardDescription>
                </div>
                <div className="text-xs text-muted-foreground">
                  17 годин тому
                </div>
                <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                  <IconBrandInstagram
                    className="size-4"
                    aria-label="Instagram"
                  />
                  <IconBrandX className="size-4" aria-label="X" />
                </div>
              </div>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                $1000.00
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            $1,000,000 Giveaway Stream
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-start gap-3">
            <Avatar className="size-10 rounded-md">
              <AvatarImage
                src="https://placehold.co/80x80?text=SS"
                alt="SSundee"
              />
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>
            <div>
              <div>
                <div className="flex items-center gap-2">
                  <CardDescription>SSundee</CardDescription>
                </div>
                <div className="text-xs text-muted-foreground">
                  17 годин тому
                </div>
                <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                  <IconBrandYoutube className="size-4" aria-label="YouTube" />
                  <IconBrandTiktok className="size-4" aria-label="TikTok" />
                </div>
              </div>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                $2000.00
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Gaming Clips | I Caught a Cursed Bloop
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
