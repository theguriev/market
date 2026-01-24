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
            <CardDescription>Доступний баланс</CardDescription>
            <Tooltip>
              <TooltipTrigger aria-label="Інформація про доступний баланс" className="text-muted-foreground">
                <IconInfoCircle className="size-4" />
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>
                Кошти у вашому гаманці Creotik, готові до виведення на підключений рахунок. Ви
                отримаєте лист, коли кошти будуть доступні для виведення.
              </TooltipContent>
            </Tooltip>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $0.00
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Очікувані перекази з’являться тут</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardDescription>Середній дохід за кліп</CardDescription>
            <Tooltip>
              <TooltipTrigger aria-label="Інформація про середній дохід за кліп" className="text-muted-foreground">
                <IconInfoCircle className="size-4" />
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>
                Середній прибуток за відеокліп. Обчислюється як загальний дохід, поділений на кількість кліпів.
              </TooltipContent>
            </Tooltip>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formattedAveragePerClip}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">На основі доходу та кількості кліпів</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardDescription>Баланс в очікуванні</CardDescription>
            <Tooltip>
              <TooltipTrigger aria-label="Інформація про баланс в очікуванні" className="text-muted-foreground">
                <IconInfoCircle className="size-4" />
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>
                Ваші доходи переходять з очікування у доступні після остаточного підрахунку переглядів і перевірок на шахрайство. Зачекайте до 10 днів після завершення кампанії.
              </TooltipContent>
            </Tooltip>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $0.00
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Перейде після остаточних перевірок</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardDescription>Загальний дохід</CardDescription>
            <Tooltip>
              <TooltipTrigger aria-label="Інформація про загальний дохід" className="text-muted-foreground">
                <IconInfoCircle className="size-4" />
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>
                Загальна сума, яку ви вже вивели, плюс ваш поточний дохід у Vyro.
              </TooltipContent>
            </Tooltip>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $0.00
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Виведені кошти + поточний дохід</div>
        </CardFooter>
      </Card>
    </div>
  );
}
