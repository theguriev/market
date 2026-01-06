import {
    QueryKey,
    UseInfiniteQueryOptions,
    useMutation,
    UseMutationOptions,
    useQuery,
    UseQueryOptions,
    useSuspenseQuery,
} from "@tanstack/react-query";
import { api } from "./api-client";
import FetchApiError from "./api-error";
import {
    ExtractClientErrorHTTPResponse,
    ExtractResponses,
    ExtractSchema,
    ExtractServerErrorHTTPResponse,
    ExtractSuccessfulHTTPResponse,
    Parameters,
    Paths,
} from "./types";

export type ExtractResponse<
  Key extends keyof typeof api,
  Path extends keyof Paths[Key],
  Method extends keyof Paths[Key][Path]
> = ExtractSchema<
  ExtractSuccessfulHTTPResponse<ExtractResponses<Paths[Key][Path][Method]>>
>;

export type ExtractError<
  Key extends keyof typeof api,
  Path extends keyof Paths[Key],
  Method extends keyof Paths[Key][Path]
> = ExtractSchema<
  | ExtractClientErrorHTTPResponse<ExtractResponses<Paths[Key][Path][Method]>>
  | ExtractServerErrorHTTPResponse<ExtractResponses<Paths[Key][Path][Method]>>
>;

export type ExtractQueryOptions<Response, Transformed = Response> = Omit<
  UseQueryOptions<Response, Error, Transformed>,
  "queryKey" | "queryFn"
> & { queryKey?: QueryKey };

export type ExtractSuspenseQueryOptions<
  Response,
  Transformed = Response
> = ExtractQueryOptions<Response, Transformed> & {
  errorResult?: Response;
};

export type ExtractInfiniteQueryOptions<
  Response,
  Transformed = Response,
  TQueryData = Transformed,
  TQueryKey extends QueryKey = readonly unknown[],
  TPageParam = unknown,
> = Omit<
  UseInfiniteQueryOptions<Response, FetchApiError, Transformed, TQueryData, TQueryKey, TPageParam>,
  "queryKey" | "queryFn" | "getNextPageParam" | "getPreviousPageParam"
>;

export type ExtractMutationOptions<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

export type ExtractFetchParams<
  Key extends keyof typeof api,
  Path extends keyof Paths[Key],
  Method extends keyof Paths[Key][Path]
> = Parameters<Paths[Key][Path][Method]>;

export const useRequest = <
  Key extends keyof typeof api,
  Path extends keyof Paths[Key],
  Method extends keyof Paths[Key][Path],
  FetchParams extends ExtractFetchParams<Key, Path, Method>,
  Response extends ExtractResponse<Key, Path, Method>,
  Transformed = Response
>(
  paths: Key,
  path: Path,
  props: {
    method: Method;
    fetchParams?: FetchParams;
    queryOptions?: ExtractQueryOptions<Response, Transformed>;
  },
  hashFn: (props: {
    service: Key,
    path: Path;
    fetchParams?: FetchParams;
    method: Method;
  }) => QueryKey = ({ service, method, path, fetchParams }) => [
    service,
    path,
    method,
    fetchParams,
  ]
) => {
  const fetchFn = api[paths] as unknown as (
    path: Path,
    method: Method,
    parameters?: FetchParams
  ) => Promise<Response>;
  const queryKey = hashFn({
    service: paths,
    path,
    fetchParams: props.fetchParams,
    method: props.method,
  });
  return {
    ...useQuery({
      queryKey,
      queryFn: () => fetchFn(path, props.method, props.fetchParams),
      ...props.queryOptions,
    }),
    queryKey,
  };
};

export const useSuspenseRequest = <
  Key extends keyof typeof api,
  Path extends keyof Paths[Key],
  Method extends keyof Paths[Key][Path],
  FetchParams extends ExtractFetchParams<Key, Path, Method>,
  Response extends ExtractResponse<Key, Path, Method>,
  Transformed = Response
>(
  paths: Key,
  path: Path,
  props: {
    method: Method;
    fetchParams?: FetchParams;
    queryOptions?: ExtractSuspenseQueryOptions<Response, Transformed>;
  },
  hashFn: (props: {
    service: Key;
    path: Path;
    fetchParams?: FetchParams;
    method: Method;
  }) => QueryKey = ({ service, method, path, fetchParams }) => [
    service,
    path,
    method,
    fetchParams,
  ]
) => {
  const fetchFn = api[paths] as unknown as (
    path: Path,
    method: Method,
    parameters?: FetchParams
  ) => Promise<Response>;
  const queryKey =
    props.queryOptions?.queryKey ||
    hashFn({
      service: paths,
      path,
      fetchParams: props.fetchParams,
      method: props.method,
    });
  return {
    queryKey,
    ...useSuspenseQuery({
      queryKey,
      queryFn: async () => {
        if (props.queryOptions?.errorResult) {
          try {
            return await fetchFn(path, props.method, props.fetchParams);
          } catch (error) {
            console.error("Error fetching data:", error);
            return props.queryOptions.errorResult;
          }
        }
        return fetchFn(path, props.method, props.fetchParams);
      },
      ...props.queryOptions,
    }),
  };
};

export const useMutationRequest = <
  Key extends keyof typeof api,
  Path extends keyof Paths[Key],
  Method extends keyof Paths[Key][Path],
  FetchParams extends ExtractFetchParams<Key, Path, Method>,
  Response extends ExtractResponse<Key, Path, Method>
>(
  paths: Key,
  path: Path,
  props: {
    method: Method;
    queryOptions?: ExtractMutationOptions<
      Response,
      FetchApiError,
      FetchParams,
      unknown
    >;
  }
) => {
  const fetchFn = api[paths] as unknown as (
    path: Path,
    method: Method,
    parameters?: FetchParams
  ) => Promise<Response>;
  return useMutation({
    mutationFn: (params: FetchParams) => fetchFn(path, props.method, params),
    ...props.queryOptions,
  });
};
