import { api } from "@/lib/openapi/api-client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function usePublicCampaigns() {
  return useSuspenseQuery({
    queryKey: ["campaigns", "public"],
    queryFn: () => api.api("/campaigns/public", "get"),
  });
}
