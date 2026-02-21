"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "@/lib/openapi/api-client";

const fetchUser = () => api.api("/user", "get", { authorization: true });
export type UserResponse = Awaited<ReturnType<typeof fetchUser>>;

export function useUser() {
  const { data: response } = useSuspenseQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const userData = response.data;
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    avatar: userData.avatar ?? "/avatars/shadcn.jpg",
    hasPassword: userData.has_password,
    emailVerifiedAt: userData.email_verified_at,
    createdAt: userData.created_at,
    providers: userData.providers,
  };
}
