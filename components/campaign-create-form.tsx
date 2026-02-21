"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/openapi/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";

type CampaignFormState = {
  title: string;
  description: string;
  minDuration: string;
  maxDuration: string;
  deadline: string; // ISO date string (YYYY-MM-DD)
  numberOfCreators: string;
  ageMin: string;
  ageMax: string;
  gender: "all" | "male" | "female";
  cpmRate: string;
  totalBudget: string;
  platformsCsv: string; // comma-separated list
  additional?: string;
  verifiedCreatorOnly: boolean;
  requirePortfolioReview: boolean;
  minimum10kFollowers: boolean;
  status?: "open" | "closed";
  contentStylesCsv?: string;
  videoFormatsCsv?: string;
};

export function CampaignCreateForm() {
  const [form, setForm] = useState<CampaignFormState>({
    title: "",
    description: "",
    minDuration: "15",
    maxDuration: "60",
    deadline: "",
    numberOfCreators: "1",
    ageMin: "18",
    ageMax: "99",
    gender: "all",
    cpmRate: "0",
    totalBudget: "0",
    platformsCsv: "",
    additional: "",
    verifiedCreatorOnly: false,
    requirePortfolioReview: false,
    minimum10kFollowers: false,
    status: "open",
    contentStylesCsv: "",
    videoFormatsCsv: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleChange =
    (name: keyof CampaignFormState) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [name]: event.target.value }));
    };

  const handleCheckbox =
    (name: keyof CampaignFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [name]: event.target.checked }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const platforms = form.platformsCsv
        .split(",")
        .map((segment) => segment.trim())
        .filter(Boolean);

      const content_styles = (form.contentStylesCsv || "")
        .split(",")
        .map((segment) => segment.trim())
        .filter(Boolean);

      const video_formats = (form.videoFormatsCsv || "")
        .split(",")
        .map((segment) => segment.trim())
        .filter(Boolean);

      await api.api("/campaigns", "post", {
        authorization: true,
        body: {
          title: form.title,
          description: form.description,
          min_duration: Number(form.minDuration),
          max_duration: Number(form.maxDuration),
          deadline: new Date(form.deadline).toISOString(),
          number_of_creators: Number(form.numberOfCreators),
          age_min: Number(form.ageMin),
          age_max: Number(form.ageMax),
          gender: form.gender,
          cpm_rate: Number(form.cpmRate),
          total_budget: Number(form.totalBudget),
          platforms,
          additional: form.additional || null,
          verified_creator_only: form.verifiedCreatorOnly || false,
          require_portfolio_review: form.requirePortfolioReview || false,
          minimum_10k_followers: form.minimum10kFollowers || false,
          status: form.status,
          content_styles: content_styles.length ? content_styles : null,
          video_formats: video_formats.length ? video_formats : null,
        },
      });

      setSuccessMessage("Кампанію успішно створено");
      setForm((prev) => ({
        ...prev,
        title: "",
        description: "",
        platformsCsv: "",
        additional: "",
        contentStylesCsv: "",
        videoFormatsCsv: "",
      }));
      await queryClient.invalidateQueries({ queryKey: ["campaigns", "mine"] });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Не вдалося створити кампанію",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="campaign-title">
              <FieldTitle>Назва</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Input
                id="campaign-title"
                name="title"
                value={form.title}
                onChange={handleChange("title")}
                required
                placeholder="Назва вашої кампанії"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="campaign-description">
              <FieldTitle>Опис</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Textarea
                id="campaign-description"
                name="description"
                value={form.description}
                onChange={handleChange("description")}
                required
                placeholder="Короткий опис"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="campaign-additional">
              <FieldTitle>Додаткова інформація</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Textarea
                id="campaign-additional"
                name="additional"
                value={form.additional}
                onChange={handleChange("additional")}
                placeholder="Необов’язково: деталі або вимоги"
              />
              <FieldDescription>Необов’язкове поле</FieldDescription>
            </FieldContent>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="campaign-min-duration">
                <FieldTitle>Мін. тривалість (сек)</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="campaign-min-duration"
                  inputMode="numeric"
                  name="minDuration"
                  value={form.minDuration}
                  onChange={handleChange("minDuration")}
                  required
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="campaign-max-duration">
                <FieldTitle>Макс. тривалість (сек)</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="campaign-max-duration"
                  inputMode="numeric"
                  name="maxDuration"
                  value={form.maxDuration}
                  onChange={handleChange("maxDuration")}
                  required
                />
              </FieldContent>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="campaign-age-min">
                <FieldTitle>Мін. вік</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="campaign-age-min"
                  inputMode="numeric"
                  name="ageMin"
                  value={form.ageMin}
                  onChange={handleChange("ageMin")}
                  required
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="campaign-age-max">
                <FieldTitle>Макс. вік</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="campaign-age-max"
                  inputMode="numeric"
                  name="ageMax"
                  value={form.ageMax}
                  onChange={handleChange("ageMax")}
                  required
                />
              </FieldContent>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="campaign-cpm">
                <FieldTitle>Ставка CPM</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="campaign-cpm"
                  inputMode="decimal"
                  name="cpmRate"
                  value={form.cpmRate}
                  onChange={handleChange("cpmRate")}
                  required
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="campaign-budget">
                <FieldTitle>Загальний бюджет</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="campaign-budget"
                  inputMode="decimal"
                  name="totalBudget"
                  value={form.totalBudget}
                  onChange={handleChange("totalBudget")}
                  required
                />
              </FieldContent>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="campaign-creators">
                <FieldTitle>Кількість креаторів</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="campaign-creators"
                  inputMode="numeric"
                  name="numberOfCreators"
                  value={form.numberOfCreators}
                  onChange={handleChange("numberOfCreators")}
                  required
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="campaign-content-styles">
                <FieldTitle>Стилі контенту</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="campaign-content-styles"
                  name="contentStylesCsv"
                  value={form.contentStylesCsv || ""}
                  onChange={handleChange("contentStylesCsv")}
                  placeholder="наприклад: tutorial, review"
                />
                <FieldDescription>
                  Необов’язково: коди стилів через кому
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="campaign-video-formats">
                <FieldTitle>Формати відео</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="campaign-video-formats"
                  name="videoFormatsCsv"
                  value={form.videoFormatsCsv || ""}
                  onChange={handleChange("videoFormatsCsv")}
                  placeholder="наприклад: mp4, mov"
                />
                <FieldDescription>
                  Необов’язково: коди форматів через кому
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="campaign-deadline">
                <FieldTitle>Кінцевий термін</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="campaign-deadline"
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange("deadline")}
                  required
                />
              </FieldContent>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="campaign-gender">
                <FieldTitle>Стать</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <select
                  id="campaign-gender"
                  name="gender"
                  className="border-input h-9 w-full rounded-md border bg-background px-3 text-sm"
                  value={form.gender}
                  onChange={handleChange("gender")}
                >
                  <option value="all">Усі</option>
                  <option value="male">Чоловіки</option>
                  <option value="female">Жінки</option>
                </select>
                <FieldDescription>
                  Бажана стать цільової аудиторії
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="campaign-platforms">
                <FieldTitle>Платформи</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="campaign-platforms"
                  name="platformsCsv"
                  value={form.platformsCsv}
                  onChange={handleChange("platformsCsv")}
                  placeholder="наприклад: tiktok, instagram"
                />
                <FieldDescription>
                  Список кодів платформ через кому
                </FieldDescription>
              </FieldContent>
            </Field>
          </div>
        </FieldGroup>

        {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}
        {successMessage ? (
          <div className="text-green-600 text-sm">{successMessage}</div>
        ) : null}

        <div className="flex gap-3">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Створення..." : "Створити кампанію"}
          </Button>
        </div>
      </FieldSet>
    </form>
  );
}
