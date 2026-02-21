"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/hooks/use-user";
import { api } from "@/lib/openapi/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const profileSchema = z.object({
  name: z.string().min(1, "Ім'я є обов'язковим"),
  email: z.string().email("Введіть коректну електронну адресу"),
  avatar: z
    .string()
    .url("Введіть коректний URL аватара")
    .optional()
    .or(z.literal("")),
  role: z.enum(["creator", "company"]),
});

type ProfileValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const user = useUser();
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
    setValue,
    watch,
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      avatar: user.avatar === "/avatars/shadcn.jpg" ? "" : user.avatar,
      role: user.role as "creator" | "company",
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (values: ProfileValues) => {
      const body: any = {
        name: values.name,
        email: values.email,
        role: values.role,
      };

      // Only include avatar if it's provided
      if (values.avatar && values.avatar.trim()) {
        body.avatar = values.avatar;
      } else if (values.avatar === "") {
        body.avatar = null;
      }

      return api.api("/user/profile", "put", {
        authorization: true,
        body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Профіль успішно оновлено");
      setSubmitting(false);
    },
    onError: async (error: any) => {
      const message =
        error &&
        typeof error === "object" &&
        "humanReadableJSONMessage" in error
          ? await error.humanReadableJSONMessage()
          : "Помилка оновлення профілю";

      setError("root", { message });
      toast.error(message);
      setSubmitting(false);
    },
  });

  const onSubmit = async (values: ProfileValues) => {
    setSubmitting(true);
    updateProfileMutation.mutate(values);
  };

  const avatarValue = watch("avatar");
  const displayAvatar =
    avatarValue && avatarValue.trim() ? avatarValue : user.avatar;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="size-16">
          <AvatarImage src={displayAvatar} alt="Аватар" />
          <AvatarFallback className="text-lg">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-medium">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Separator />

      <FieldGroup>
        <div className="grid gap-4 md:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">Ім'я</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="Введіть ваше ім'я"
              {...register("name")}
            />
            <FieldError errors={[errors.name]} />
          </Field>

          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Ел. пошта</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>

          <Field data-invalid={!!errors.role}>
            <FieldLabel htmlFor="role">Роль</FieldLabel>
            <Select
              defaultValue={user.role}
              onValueChange={(value) =>
                setValue("role", value as "creator" | "company", {
                  shouldDirty: true,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Виберіть роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="creator">UGC-креатор</SelectItem>
                <SelectItem value="company">Рекламодавець</SelectItem>
              </SelectContent>
            </Select>
            <FieldError errors={[errors.role]} />
          </Field>

          <Field data-invalid={!!errors.avatar}>
            <FieldLabel htmlFor="avatar">URL аватара</FieldLabel>
            <Input
              id="avatar"
              type="url"
              placeholder="https://example.com/avatar.jpg"
              {...register("avatar")}
            />
            <FieldDescription>
              Необов'язково. Залиште порожнім для стандартного аватара.
            </FieldDescription>
            <FieldError errors={[errors.avatar]} />
          </Field>
        </div>

        <Field>
          <Button type="submit" disabled={submitting || !isDirty}>
            {submitting ? "Збереження..." : "Зберегти зміни"}
          </Button>
          <FieldError errors={[errors.root as any]} />
        </Field>
      </FieldGroup>
    </form>
  );
}
