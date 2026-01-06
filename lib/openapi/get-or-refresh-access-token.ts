import isAccessTokenValid from "@/utils/is-access-token-valid";
import getAccessToken from "./get-access-token";

const getOrRefreshAccessToken = async () => {
  try {
    return await navigator.locks.request("accessTokenLock", async () => {
      const valid = isAccessTokenValid();
      if (valid) {
        return getAccessToken();
      }
      
      const refreshResponse = await fetch(`${import.meta.env.VITE_API_URL}/authorization/refresh`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!refreshResponse.ok) {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        if (refreshResponse.status === 401 || refreshResponse.status === 500) {
          window.location.href = "/login";
        }
        
        return "";
      }
      
      const newToken = getAccessToken();
      if (!newToken) {
        console.error("No token received after refresh");
        return "";
      }
      
      return newToken;
    });
  } catch (error) {
    console.error("Error getting access token:", error);
    return "";
  }
};

export default getOrRefreshAccessToken;
