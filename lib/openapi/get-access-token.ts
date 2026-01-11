const getAccessToken = () => {
	if (typeof window !== "undefined") {
		try {
			// Prefer cookie for SSR compatibility; fallback to localStorage
			const cookieValue = document.cookie
				.split(";")
				.map((c) => c.trim())
				.find((c) => c.startsWith("accessToken="));
			if (cookieValue) {
				return cookieValue.split("=")[1] || "";
			}
			return localStorage.getItem("accessToken") || "";
		} catch {
			return "";
		}
	}
	return "";
};

export default getAccessToken;
