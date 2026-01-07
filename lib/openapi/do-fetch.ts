import addQuery from "./add-query";
import FetchApiError from "./api-error";
import { SUCCESS_CODES } from "./constants";
import getOrRefreshAccessToken from "./get-or-refresh-access-token";
import processRequestParameters from "./process-request-parameters";
import replacePathParameters from "./replacePathParameters";

const doFetch = async ({
  method,
  parameters,
  baseUrl,
  path,
}: {
  method: string;
  path: string;
  parameters: {
    body?: BodyInit | null;
    cookie?: Record<string, string>;
    query?: Record<string, string>;
    path?: Record<string, string>;
    authorization?: boolean;
  };
  baseUrl: string;
}) => {
  const makeRequest = async () => {
    const { query, fetchParameters, pathParams } = processRequestParameters({
      method: String(method),
      parameters,
      accessToken: await getOrRefreshAccessToken(),
    });
    const url = addQuery(
      `${baseUrl}${replacePathParameters(path.toString(), pathParams)}`,
      query
    );
    
    const request = await fetch(url, {
      ...fetchParameters,
      headers: {
        "Content-Type": "application/json",
        ...(fetchParameters?.headers || {}),
      },
    });

    if (SUCCESS_CODES.has(request.status)) {
      const contentType = request.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return request.json();
      }
      // Handle non-JSON responses
      return request.text();
    }
    
    throw new FetchApiError(request);
  };

  try {
    return await makeRequest();
  } catch (error) {
    if (error instanceof FetchApiError) {
      throw error;
    }
    // Handle network errors, timeouts, etc.
    throw new Error(
      `Network error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export default doFetch;
