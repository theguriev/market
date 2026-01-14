"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/openapi/api-client";
import { getGoogleAccessToken } from "@/lib/google-oauth";
import { getAppleIdToken } from "@/lib/apple-oauth";

const loginSchema = z.object({
  email: z.string().email("Введіть коректну електронну адресу"),
  password: z.string().min(6, "Пароль має містити щонайменше 6 символів"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [appleSubmitting, setAppleSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), mode: "onSubmit" });

  const onSubmit = async (values: LoginValues) => {
    try {
      setSubmitting(true);
      const res = await api.api("/login", "post", { body: values });
      // Persist token for authenticated requests
      try {
        const token = (res as any)?.data?.token;
        if (token) {
          // Persist in cookie so SSR can access via cookies()
          const secureAttr = typeof window !== "undefined" && window.location.protocol === "https:"
            ? "; Secure"
            : "";
          const maxAge = 60 * 60 * 24 * 30; // 30 days
          document.cookie = `accessToken=${token}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secureAttr}`;
        }
      } catch {}
      // Redirect to home
      router.replace("/");
    } catch (err) {
      const message =
        err && typeof err === "object" && "humanReadableJSONMessage" in (err as any)
          ? await (err as any).humanReadableJSONMessage()
          : "Login failed";
      setError("root", { message });
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogleLogin = async () => {
    try {
      setGoogleSubmitting(true);
      const accessToken = await getGoogleAccessToken();
      const res = await api.api("/login/google", "post", { body: { access_token: accessToken } });
      try {
        const token = (res as any)?.data?.token;
        if (token) {
          const secureAttr = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
          const maxAge = 60 * 60 * 24 * 30; // 30 days
          document.cookie = `accessToken=${token}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secureAttr}`;
        }
      } catch {}
      router.replace("/");
    } catch (err) {
      const message =
        err && typeof err === "object" && "humanReadableJSONMessage" in (err as any)
          ? await (err as any).humanReadableJSONMessage()
          : (err as Error)?.message || "Google login failed";
      // Surface error via root form error slot
      // Note: reusing setError from react-hook-form for consistency
      (setError as any)("root", { message });
    } finally {
      setGoogleSubmitting(false);
    }
  };

  const onAppleLogin = async () => {
    try {
      setAppleSubmitting(true);
      const tokenOrCode = await getAppleIdToken();
      const res = await api.api("/login/apple", "post", { body: { access_token: tokenOrCode } });
      try {
        const token = (res as any)?.data?.token;
        if (token) {
          const secureAttr = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
          const maxAge = 60 * 60 * 24 * 30; // 30 days
          document.cookie = `accessToken=${token}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secureAttr}`;
        }
      } catch {}
      router.replace("/");
    } catch (err) {
      const message =
        err && typeof err === "object" && "humanReadableJSONMessage" in (err as any)
          ? await (err as any).humanReadableJSONMessage()
          : (err as Error)?.message || "Apple login failed";
      (setError as any)("root", { message });
    } finally {
      setAppleSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a href="#logo" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Social Market</span>
            </a>
            <h1 className="text-xl font-bold">Ласкаво просимо до Social Market</h1>
            <FieldDescription>
              Немає облікового запису? <a href="/signup">Зареєструйтеся</a>
            </FieldDescription>
          </div>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Ел. пошта</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@приклад.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">Пароль</FieldLabel>
            <Input
              id="password"
              type="password"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <FieldError errors={[errors.password]} />
          </Field>
          <Field>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Вхід..." : "Увійти"}
            </Button>
            <FieldError errors={[errors.root as any]} />
          </Field>
          <FieldSeparator>Або</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button" onClick={onAppleLogin} disabled={appleSubmitting}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Apple logo</title>
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              {appleSubmitting ? "Підключення Apple..." : "Увійти через Apple"}
            </Button>
            <Button variant="outline" type="button" onClick={onGoogleLogin} disabled={googleSubmitting}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Google logo</title>
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              {googleSubmitting ? "Підключення Google..." : "Увійти через Google"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        Натискаючи «Продовжити», ви погоджуєтесь з нашими <a href="#terms">Умовами надання послуг</a> та{" "}
        <a href="#privacy">Політикою конфіденційності</a>.
      </FieldDescription>
    </div>
  );
}
