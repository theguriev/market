"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/openapi/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleChange = (name: keyof CampaignFormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [name]: event.target.value }));
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
        },
      });

      setSuccessMessage("Campaign created successfully");
      setForm((prev) => ({
        ...prev,
        title: "",
        description: "",
        platformsCsv: "",
      }));
      await queryClient.invalidateQueries({ queryKey: ["campaigns", "mine"] });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to create campaign");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="campaign-title">
              <FieldTitle>Title</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Input
                id="campaign-title"
                name="title"
                value={form.title}
                onChange={handleChange("title")}
                required
                placeholder="Your campaign title"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="campaign-description">
              <FieldTitle>Description</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Input
                id="campaign-description"
                name="description"
                value={form.description}
                onChange={handleChange("description")}
                required
                placeholder="Brief description"
              />
            </FieldContent>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="campaign-min-duration">
                <FieldTitle>Min Duration (sec)</FieldTitle>
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
                <FieldTitle>Max Duration (sec)</FieldTitle>
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
                <FieldTitle>Age Min</FieldTitle>
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
                <FieldTitle>Age Max</FieldTitle>
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
                <FieldTitle>CPM Rate</FieldTitle>
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
                <FieldTitle>Total Budget</FieldTitle>
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
                <FieldTitle>Number of Creators</FieldTitle>
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
              <FieldLabel htmlFor="campaign-deadline">
                <FieldTitle>Deadline</FieldTitle>
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
                <FieldTitle>Gender</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <select
                  id="campaign-gender"
                  name="gender"
                  className="border-input h-9 w-full rounded-md border bg-background px-3 text-sm"
                  value={form.gender}
                  onChange={handleChange("gender")}
                >
                  <option value="all">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <FieldDescription>Target audience gender preference</FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="campaign-platforms">
                <FieldTitle>Platforms</FieldTitle>
              </FieldLabel>
              <FieldContent>
                <Input
                  id="campaign-platforms"
                  name="platformsCsv"
                  value={form.platformsCsv}
                  onChange={handleChange("platformsCsv")}
                  placeholder="e.g. tiktok, instagram"
                />
                <FieldDescription>Comma-separated list of platform codes</FieldDescription>
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
            {submitting ? "Creating..." : "Create Campaign"}
          </Button>
        </div>
      </FieldSet>
    </form>
  );
}
