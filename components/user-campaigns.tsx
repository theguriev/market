"use client";

import { useUserCampaigns } from "@/hooks/use-user-campaigns";

type Campaign = {
  id: string;
  title: string;
  description: string;
};

export function UserCampaigns() {
  const { data } = useUserCampaigns();
  const campaigns = (data?.data ?? []) as Campaign[];

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">Your Campaigns</h2>
        <div className="text-sm text-muted-foreground">
          {campaigns.length} total
        </div>
      </div>

      {campaigns.length > 0 ? (
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <li key={campaign.id} className="rounded-lg border p-4 bg-background">
              <h3 className="font-medium leading-none mb-1 line-clamp-1">
                {campaign.title}
              </h3>
              {campaign.description ? (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {campaign.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-lg border p-6 text-sm text-muted-foreground">
          You have no campaigns yet.
        </div>
      )}
    </section>
  );
}
