import { api } from "@/lib/openapi/api-client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useUserCampaigns() {
  return useSuspenseQuery({
    queryKey: ["campaigns", "mine"],
    queryFn: () => api.api("/campaigns", "get", { authorization: true }),
  });
}
