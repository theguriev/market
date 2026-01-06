import defu from "defu";
import omit from "../omit";
import getAccessToken from "./get-access-token";
import objectifyOrUndefinedCookie from "./objectify-or-undefined-cookie";
import stringifyOrUndefinedBody from "./stringifyOrUndefinedBody";

const processRequestParameters = ({
  method,
  parameters,
}: {
  method: string;
  parameters: {
    body?: BodyInit | null;
    cookie?: Record<string, string>;
    query?: Record<string, string>;
    path?: Record<string, string>;
    authorization?: boolean;
  };
  accessToken?: string;
}) => {
  const body = "body" in parameters ? parameters.body : undefined;
  const cookie = "cookie" in parameters ? parameters.cookie : undefined;
  const query =
    "query" in parameters
      ? (parameters.query as Record<string, string>)
      : undefined;
  const cookieWithAuthorization = parameters.authorization
    ? {
        accessToken: getAccessToken(),
        ...(cookie as Record<string, string>),
      }
    : cookie;
  const pathParams =
    "path" in parameters ? (parameters.path as Record<string, string>) : {};

  const fetchParameters = defu(
    {
      method,
      body: stringifyOrUndefinedBody(body as BodyInit),
      headers: {
        ...objectifyOrUndefinedCookie(
          cookieWithAuthorization as Record<string, string>
        ),
      },
    },
    omit(parameters as Record<string, string>, [
      "body",
      "cookie",
      "authorization",
      "path",
    ])
  ) as unknown as RequestInit;

  return {
    fetchParameters,
    pathParams,
    query,
  };
};

export default processRequestParameters;
