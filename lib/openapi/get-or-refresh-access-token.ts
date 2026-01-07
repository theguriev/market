import getAccessToken from "./get-access-token";

const getOrRefreshAccessToken = async () => {
  return getAccessToken();
};

export default getOrRefreshAccessToken;
