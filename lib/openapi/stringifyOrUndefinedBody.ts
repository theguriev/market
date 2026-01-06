const stringifyOrUndefinedBody = (
  body: BodyInit | undefined
): undefined | string => {
  if (!body) {
    return;
  }
  return JSON.stringify(body);
};

export default stringifyOrUndefinedBody;
