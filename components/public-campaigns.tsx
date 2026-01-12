"use client";

import { usePublicCampaigns } from "@/hooks/use-public-campaigns";

export function PublicCampaigns() {
  const { data } = usePublicCampaigns();

  const paginator = data?.data;
  const total = typeof paginator === "object" && paginator && "total" in paginator ? (paginator as unknown as { total: number }).total : undefined;
  const currentPage = typeof paginator === "object" && paginator && "current_page" in paginator ? (paginator as unknown as { current_page: number }).current_page : undefined;

  const items = (typeof paginator === "object" && paginator && "data" in paginator
    ? (paginator as unknown as { data: unknown }).data
    : undefined) as unknown;

  const campaigns = Array.isArray(items) ? (items as Array<Record<string, unknown>>) : [];

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">Public Campaigns</h2>
        <div className="text-sm text-muted-foreground">
          {typeof total === "number" ? `${total} total` : null}
          {typeof currentPage === "number" ? ` • Page ${currentPage}` : null}
        </div>
      </div>

      {campaigns.length > 0 ? (
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign, index) => {
            const title = typeof campaign?.["title"] === "string" ? (campaign["title"] as string) : `Campaign #${index + 1}`;
            const description = typeof campaign?.["description"] === "string" ? (campaign["description"] as string) : undefined;
            return (
              <li key={index} className="rounded-lg border p-4 bg-background">
                <h3 className="font-medium leading-none mb-1 line-clamp-1">{title}</h3>
                {description ? (
                  <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="rounded-lg border p-6 text-sm text-muted-foreground">
          No public campaigns to display.
        </div>
      )}
    </section>
  );
}
