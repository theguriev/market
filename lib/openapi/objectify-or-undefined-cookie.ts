const objectifyOrUndefinedCookie = (cookie: Record<string, string>) => {
  if (!cookie) {
    return;
  }
  return {
    Cookie: Object.entries(cookie)
      .map(([key, value]) => `${key}=${value}`)
      .join("; "),
  };
};

export default objectifyOrUndefinedCookie;
