import { CampaignCard } from "@/components/campaign-card";

export function CampaignCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <CampaignCard
        avatar={{
          src: "https://placehold.co/80x80?text=MB",
          alt: "MrBeast",
          fallback: "MB",
        }}
        name="MrBeast"
        timeText="17 годин тому"
        title="Big Game Commercial: Salesforce"
        platforms={["youtube", "instagram", "x"]}
        price={1000}
      />
      <CampaignCard
        avatar={{
          src: "https://placehold.co/80x80?text=WN",
          alt: "Whatnot",
          fallback: "WN",
        }}
        name="Whatnot"
        timeText="17 годин тому"
        title="$1,000,000 Giveaway Stream"
        platforms={["instagram", "x"]}
        price={1000}
      />
      <CampaignCard
        avatar={{
          src: "https://placehold.co/80x80?text=SS",
          alt: "SSundee",
          fallback: "SS",
        }}
        name="SSundee"
        timeText="17 годин тому"
        title="Gaming Clips | I Caught a Cursed Bloop"
        platforms={["youtube", "tiktok"]}
        price={2000}
      />
    </div>
  );
}
