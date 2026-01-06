import getCookie from "@/utils/getCookie";

const getAccessToken = () => getCookie("accessToken");

export default getAccessToken;
