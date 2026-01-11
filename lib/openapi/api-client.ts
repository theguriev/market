import createService from "./create-service";
import doFetch from "./do-fetch";
import { ExtraParams } from "./types";

export const api = {
  api: createService(
    "api",
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
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
      })
  ),
};
