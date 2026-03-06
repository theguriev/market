import { CampaignCard } from "@/components/campaign-card";

export function CampaignCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <CampaignCard
        id="1"
        avatar={{
          src: "https://cdn.vyro.com/RYMzMLKd/channels4_profile_-_2025-10-08t130125_276-RYMzMLKd.png",
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
        id="2"
        avatar={{
          src: "https://cdn.vyro.com/gyOOYqSh/$gyOOYqSh.png",
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
        id="3"
        avatar={{
          src: "https://cdn.vyro.com/AM1UZJ4o/$AM1UZJ4o.png",
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
