import { omitBy, isUndefined } from "es-toolkit";

const addQuery = (
  baseUrl: string,
  query: Record<string, string> | undefined
) => {
  if (!query) {
    return baseUrl;
  }
  const withoutUndefined = omitBy(query, isUndefined);
  if (Object.keys(withoutUndefined).length === 0) {
    return baseUrl;
  }
  const searchParams = new URLSearchParams(
    withoutUndefined as Record<string, string>
  );
  return [baseUrl, searchParams].join("?");
};

export default addQuery;
