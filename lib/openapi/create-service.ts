import type {
  Parameters as EndpointParameters,
  ExtractResponses,
  ExtractSchema,
  ExtractSuccessfulHTTPResponse,
  ExtraParams,
  Paths,
} from "./types";

const createService = <Service extends keyof Paths>(
  service: Service,
  anyPromiseFn: <
    Path extends keyof Paths[Service],
    Method extends keyof Paths[Service][Path],
    Responses extends ExtractResponses<Paths[Service][Path][Method]>,
    Response extends ExtractSchema<ExtractSuccessfulHTTPResponse<Responses>>
  >(options: {
    path: Path;
    method: Method;
    parameters: EndpointParameters<Paths[Service][Path][Method]> &
      Omit<RequestInit, "body"> &
      ExtraParams;
    service: Service;
  }) => Promise<Response>
) => {
  return async <
    Path extends keyof Paths[Service],
    Method extends keyof Paths[Service][Path]
  >(
    path: Path,
    method: Method = "get" as Method,
    parameters: EndpointParameters<Paths[Service][Path][Method]> &
      Omit<RequestInit, "body"> &
      ExtraParams = {} as EndpointParameters<Paths[Service][Path][Method]> &
      Omit<RequestInit, "body"> &
      ExtraParams
  ) => {
    return anyPromiseFn({ path, method, parameters, service });
  };
};

export default createService;
