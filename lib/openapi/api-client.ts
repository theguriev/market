import createService from "./create-service";
import doFetch from "./do-fetch";
import { ExtraParams } from "./types";

export const api = {
  telegramAuthorization: createService(
    "telegramAuthorization",
    async ({ method, path, parameters }) =>
      doFetch({
        method: String(method),
        path,
        parameters: parameters as {
          body?: BodyInit | null;
          cookie?: Record<string, string>;
          query?: Record<string, string>;
          path?: Record<string, string>;
        } & ExtraParams,
        baseUrl: `${import.meta.env.VITE_API_URL}/authorization`,
      })
  ),
  telegramMessages: createService(
    "telegramMessages",
    async ({ method, path, parameters }) =>
      doFetch({
        method: String(method),
        path,
        parameters: parameters as {
          body?: BodyInit | null;
          cookie?: Record<string, string>;
          query?: Record<string, string>;
          path?: Record<string, string>;
        } & ExtraParams,
        baseUrl: `${import.meta.env.VITE_API_URL}`,
      })
  ),
  serviceMeasurements: createService(
    "serviceMeasurements",
    async ({ method, path, parameters }) =>
      doFetch({
        method: String(method),
        path,
        parameters: parameters as {
          body?: BodyInit | null;
          cookie?: Record<string, string>;
          query?: Record<string, string>;
          path?: Record<string, string>;
        } & ExtraParams,
        baseUrl: `${import.meta.env.VITE_API_URL}`,
      })
  ),
  serviceMeals: createService(
    "serviceMeals",
    async ({ method, path, parameters }) =>
      doFetch({
        method: String(method),
        path,
        parameters: parameters as {
          body?: BodyInit | null;
          cookie?: Record<string, string>;
          query?: Record<string, string>;
          path?: Record<string, string>;
        } & ExtraParams,
        baseUrl: `${import.meta.env.VITE_API_URL}`,
      })
  ),
  serviceMealsV1: createService(
    "serviceMealsV1",
    async ({ method, path, parameters }) =>
      doFetch({
        method: String(method),
        path,
        parameters: parameters as {
          body?: BodyInit | null;
          cookie?: Record<string, string>;
          query?: Record<string, string>;
          path?: Record<string, string>;
        } & ExtraParams,
        baseUrl: `${import.meta.env.VITE_API_URL}/v1`,
      })
  ),
  serviceBilling: createService(
    "serviceBilling",
    async ({ method, path, parameters }) =>
      doFetch({
        method: String(method),
        path,
        parameters: parameters as {
          body?: BodyInit | null;
          cookie?: Record<string, string>;
          query?: Record<string, string>;
          path?: Record<string, string>;
        } & ExtraParams,
        baseUrl: `${import.meta.env.VITE_API_BILLING_URL}`,
      })
  ),
};
