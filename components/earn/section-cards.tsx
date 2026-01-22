import { IconTrendingDown, IconTrendingUp, IconInfoCircle } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type SectionCardsProps = {
  totalEarnings?: number;
  videoClipCount?: number;
};
export function SectionCards({ totalEarnings = 0, videoClipCount = 0 }: SectionCardsProps) {
  const averagePerClip = videoClipCount > 0 ? totalEarnings / videoClipCount : 0;
  const formattedAveragePerClip = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(averagePerClip);
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardDescription>Available balance</CardDescription>
            <Tooltip>
              <TooltipTrigger aria-label="Available balance info" className="text-muted-foreground">
                <IconInfoCircle className="size-4" />
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>
                Funds in your Creotik wallet, ready to withdraw to your connected account. You'll
                get an email when funds are available to cash out.
              </TooltipContent>
            </Tooltip>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $0.00
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Pending transfers will appear here</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardDescription>Average per clip</CardDescription>
            <Tooltip>
              <TooltipTrigger aria-label="Average per clip info" className="text-muted-foreground">
                <IconInfoCircle className="size-4" />
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>
                Average profit per video clip. Calculated as total earnings divided by the number of clips.
              </TooltipContent>
            </Tooltip>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formattedAveragePerClip}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Based on earnings and clip count</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardDescription>Pending balance</CardDescription>
            <Tooltip>
              <TooltipTrigger aria-label="Pending balance info" className="text-muted-foreground">
                <IconInfoCircle className="size-4" />
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>
                Your earnings move from pending to available after final view tallying and fraud checks. Please allow 10 days after the campaign ends.
              </TooltipContent>
            </Tooltip>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $0.00
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Will transfer after final checks</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardDescription>Lifetime earnings</CardDescription>
            <Tooltip>
              <TooltipTrigger aria-label="Lifetime earnings info" className="text-muted-foreground">
                <IconInfoCircle className="size-4" />
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>
                The total amount you've cashed out plus your current Vyro earnings.
              </TooltipContent>
            </Tooltip>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $0.00
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Cashed out + current earnings</div>
        </CardFooter>
      </Card>
    </div>
  );
}
