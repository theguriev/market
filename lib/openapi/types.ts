import {
  api
} from "./schemas";

export type ExtractResponses<T> = ExtractKey<T, "responses">;

export type ExtractKey<T, K> = keyof T extends infer P
  ? P extends keyof T
    ? P extends K
      ? T[P]
      : never
    : never
  : never;

export type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type ExtractContentJson<T> = "content" extends keyof T
  ? "application/json" extends keyof T["content"]
    ? T["content"]["application/json"]
    : never
  : never;

type HasParameters = {
  parameters: Record<string, unknown>;
};

type ExtractParameters<T> = T extends HasParameters
  ? Partial<ExtractKey<T, "parameters">>
  : unknown;

type HasRequestBody = {
  requestBody: { content: { "application/json": unknown } };
};

type AddRequestBodyIfExists<T, V> = T extends HasRequestBody
  ? V & { body: T["requestBody"]["content"]["application/json"] }
  : V;

type AddExtra<T> = T & {
  headers?: HeadersInit & { "Content-type"?: ContentType };
  mode?: RequestMode;
};

type MakePathRequiredIfExists<T> = "path" extends keyof T
  ? Omit<T, "path"> & { path: T["path"] }
  : T;

export type Parameters<T> = MakePathRequiredIfExists<
  AddExtra<AddRequestBodyIfExists<T, ExtractParameters<T>>>
>;

type BaseParams = {
  query: Record<string, unknown>;
  body: Record<string, string>;
  path: Record<string, string>;
};
export type InnerParams = AddExtra<BaseParams>;

export type GeneratorConfig = {
  entries: Array<[string, string]>;
  baseUrl: string;
  targetFolder: string;
};

/**
 * Possible content types what we allow to our api.
 */
export type ContentType = "" | "application/json";

export type Paths = {
  api: api.paths;
};

export type ExtractSchema<T> = T extends {
  content: { "application/json": infer S };
}
  ? unknown extends S
    ? never
    : S
  : never;

export type ExtractInformationalHTTPResponse<T> = ExtractKey<T, IntRange<100, 200>>;
export type ExtractSuccessfulHTTPResponse<T> = ExtractKey<T, IntRange<200, 300>>;
export type ExtractRedirectionHTTPResponse<T> = ExtractKey<T, IntRange<300, 400>>;
export type ExtractClientErrorHTTPResponse<T> = ExtractKey<T, IntRange<400, 500>>;
export type ExtractServerErrorHTTPResponse<T> = ExtractKey<T, IntRange<500, 600>>;

export type ExtraParams = {
  authorization?: boolean;
  revalidate?: number;
  tags?: string[];
};
