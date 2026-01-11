# Copilot Instructions for This Repo

## Overview
- Framework: Next.js (App Router) with React 19, TanStack Query, Tailwind 4.
- API client: Typed OpenAPI client under `lib/openapi/**` using `schemas/api.d.ts`.
- Auth: Token from `/login` stored only in cookie (`accessToken`); server reads via `cookies()`.
- UI: Sidebar-centric layout; dashboard moved to `/` and guarded server-side.

## Environment & Commands
- Env: `NEXT_PUBLIC_API_URL` in `.env.local`, `.env.development`, `.env.production`.
- Run dev: `pnpm dev`
- Build/start: `pnpm build` then `pnpm start`
- Lint/format: `pnpm lint`, `pnpm format`, `pnpm check`
- OpenAPI types (if API changes): `pnpm generate` (see `package.json` `openapiFiles`)

## Architecture & Data Flow
- Routing:
  - `app/page.tsx`: Home dashboard. Server-side guard reads `accessToken` via `cookies()` and `redirect("/login")` if absent.
  - `app/layout.tsx`: Wraps children with `QueryProvider` so TanStack Query is available.
  - `app/login` and `app/signup`: Client forms posting via `api.api()`.
- Auth lifecycle:
  - Login (`components/login-form.tsx`): `api.api("/login", "post", { body })` → set cookie `accessToken` (Path=/, SameSite=Lax, Max-Age=30d; Secure on HTTPS) → `router.replace("/")`.
  - Auth header: When calling `api.api(..., { authorization: true })`, `process-request-parameters.ts` adds `Authorization: Bearer <token>`.
  - Logout (`components/nav-user.tsx`): POST `/logout`, clear `accessToken` cookie, clear Query cache, `router.replace("/login")`.
- Sidebar decomposition:
  - `components/app-sidebar.tsx`: Uses `Suspense` + `Skeleton` and composes:
    - `components/sidebar/user-panel.tsx` → renders `NavUser` using `hooks/use-user.ts`.
    - `components/sidebar/data.ts` → sample `teams`, `navMain`, `projects`.

## OpenAPI Client Usage
- Entry: `lib/openapi/api-client.ts` exposes `api.api(servicePath, method, parameters)`.
- Base URL: `${process.env.NEXT_PUBLIC_API_URL}`.
- Types: Generated at `lib/openapi/schemas/api.d.ts`; `types.ts` wires them to `Paths`.
- Request building:
  - `do-fetch.ts` + `process-request-parameters.ts`: handle query/body/cookie/headers; attach `Authorization` when `authorization: true`.
  - `get-access-token.ts`: reads token from cookie on the client; servers use `cookies()`.

### Examples
- Authenticated GET user (client):
```ts
await api.api("/user", "get", { authorization: true });
```
- Authenticated GET user (server):
```ts
import { cookies } from "next/headers";
const token = cookies().get("accessToken")?.value || "";
await api.api("/user", "get", { authorization: true, cookie: { accessToken: token } });
```
- Login:
```ts
const res = await api.api("/login", "post", { body: { email, password } });
const token = res.data.token; // store in cookie, then router.replace("/")
```

## Conventions & Patterns
- No `any` and no single-letter variables; infer types with `Awaited<ReturnType<...>>` from OpenAPI calls.
- Use named `Suspense` import, not `React.Suspense`.
- For data fetching in client components, prefer TanStack Query v5 `useSuspenseQuery` with a `Skeleton` fallback.
- To guard pages, use server-only `cookies()` + `redirect()` in page components.
- When calling authenticated endpoints, always include `{ authorization: true }`.

## Integration Notes
- UI components live under `components/ui/**`; keep styling consistent (Tailwind 4 + shadcn patterns).
- QueryProvider lives in layout; avoid creating multiple `QueryClient` instances.
- Error handling: `/user` fetch can be wrapped with an error boundary if needed; home guard ensures unauthenticated users don't reach protected UI.

## When Updating
- Adding endpoints: update `openapiFiles` or regenerate types; consume via `api.api()` with typed responses.
- New protected views: replicate the guard pattern in their page components or use a shared layout/middleware.
- Logout/login flows: centralize cookie token helpers if duplication grows (e.g., a `lib/auth.ts` with `setTokenCookie`, `clearTokenCookie`).
