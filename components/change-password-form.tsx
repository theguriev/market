"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/hooks/use-user";
import { api } from "@/lib/openapi/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { toast } from "sonner";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Поточний пароль є обов'язковим"),
    password: z
      .string()
      .min(6, "Новий пароль має містити щонайменше 6 символів"),
    passwordConfirmation: z.string().min(6, "Підтвердіть новий пароль"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Паролі не співпадають",
    path: ["passwordConfirmation"],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
  const user = useUser();
  const [submitting, setSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  // If user doesn't have a password (OAuth login), show info message
  if (!user.hasPassword) {
    return (
      <div className="flex items-start space-x-2 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
        <AlertCircle className="size-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Ви увійшли через OAuth (Google або Apple). Щоб встановити пароль для
          додаткової безпеки, зверніться до служби підтримки.
        </p>
      </div>
    );
  }

  const changePasswordMutation = useMutation({
    mutationFn: async (values: ChangePasswordValues) => {
      return api.api("/user/password", "put", {
        authorization: true,
        body: {
          current_password: values.currentPassword,
          password: values.password,
          password_confirmation: values.passwordConfirmation,
        },
      });
    },
    onSuccess: () => {
      toast.success("Пароль успішно змінено");
      reset();
      setSubmitting(false);
    },
    onError: async (error: any) => {
      const message =
        error &&
        typeof error === "object" &&
        "humanReadableJSONMessage" in error
          ? await error.humanReadableJSONMessage()
          : "Помилка зміни пароля";

      setError("root", { message });
      toast.error(message);
      setSubmitting(false);
    },
  });

  const onSubmit = async (values: ChangePasswordValues) => {
    setSubmitting(true);
    changePasswordMutation.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Field data-invalid={!!errors.currentPassword}>
          <FieldLabel htmlFor="currentPassword">Поточний пароль</FieldLabel>
          <div className="relative">
            <Input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Введіть поточний пароль"
              {...register("currentPassword")}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>
          <FieldError errors={[errors.currentPassword]} />
        </Field>

        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Новий пароль</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Введіть новий пароль"
              {...register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>
          <FieldDescription>
            Пароль має містити щонайменше 6 символів.
          </FieldDescription>
          <FieldError errors={[errors.password]} />
        </Field>

        <Field data-invalid={!!errors.passwordConfirmation}>
          <FieldLabel htmlFor="passwordConfirmation">
            Підтвердіть новий пароль
          </FieldLabel>
          <div className="relative">
            <Input
              id="passwordConfirmation"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Повторіть новий пароль"
              {...register("passwordConfirmation")}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>
          <FieldError errors={[errors.passwordConfirmation]} />
        </Field>

        <Field>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Зміна пароля..." : "Змінити пароль"}
          </Button>
          <FieldError errors={[errors.root as any]} />
        </Field>
      </FieldGroup>
    </form>
  );
}
