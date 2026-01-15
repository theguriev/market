"use client";

import { useState } from "react";
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

const signupSchema = z
  .object({
    firstName: z.string().min(1, "Ім'я є обов'язковим"),
    lastName: z.string().min(1, "Прізвище є обов'язковим"),
    role: z.enum(["creator", "company"]),
    email: z.string().email("Введіть коректну електронну адресу"),
    password: z.string().min(6, "Пароль має містити щонайменше 6 символів"),
    confirmPassword: z.string().min(6, "Підтвердіть ваш пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі мають співпадати",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupValues>({ resolver: zodResolver(signupSchema), mode: "onSubmit" });

  const onSubmit = async (values: SignupValues) => {
    try {
      setSubmitting(true);
      const body = {
        name: `${values.firstName} ${values.lastName}`.trim(),
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword,
        role: values.role,
      };
      await api.api("/register", "post", { body });
      // Optionally redirect to login or dashboard
    } catch (err) {
      const message =
        err && typeof err === "object" && "humanReadableJSONMessage" in (err as any)
          ? await (err as any).humanReadableJSONMessage()
          : "Sign up failed";
      setError("root", { message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a href="#logo" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-12 items-center justify-center rounded-md">
                <img src="/logo.svg" alt="логотип" className="size-10" />
              </div>
              <span className="sr-only">Creotik</span>
            </a>
            <h1 className="text-xl font-bold">Створіть обліковий запис</h1>
            <FieldDescription>
              Вже маєте обліковий запис? <a href="/login">Увійти</a>
            </FieldDescription>
          </div>
          <Field data-invalid={!!errors.firstName}>
            <FieldLabel htmlFor="firstName">Ім'я</FieldLabel>
            <Input
              id="firstName"
              type="text"
              placeholder="Іван"
              aria-invalid={!!errors.firstName}
              {...register("firstName")}
            />
            <FieldError errors={[errors.firstName]} />
          </Field>
          <Field data-invalid={!!errors.lastName}>
            <FieldLabel htmlFor="lastName">Прізвище</FieldLabel>
            <Input
              id="lastName"
              type="text"
              placeholder="Петренко"
              aria-invalid={!!errors.lastName}
              {...register("lastName")}
            />
            <FieldError errors={[errors.lastName]} />
          </Field>
          <Field data-invalid={!!errors.role}>
            <FieldLabel htmlFor="role">Роль</FieldLabel>
            <select
              id="role"
              aria-invalid={!!errors.role}
              className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm"
              {...register("role")}
            >
              <option value="creator">UGC-креатор</option>
              <option value="company">Рекламодавець</option>
            </select>
            <FieldError errors={[errors.role]} />
          </Field>
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
          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel htmlFor="confirmPassword">Підтвердіть пароль</FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
            <FieldError errors={[errors.confirmPassword]} />
          </Field>
          <Field>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Реєстрація..." : "Зареєструватися"}
            </Button>
            <FieldError errors={[errors.root as any]} />
          </Field>
          <FieldSeparator>Або</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Apple logo</title>
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Увійти через Apple
            </Button>
            <Button variant="outline" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Google logo</title>
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Увійти через Google
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
