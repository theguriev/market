"use client";

let googleScriptLoading: Promise<void> | null = null;

function loadGoogleScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (googleScriptLoading) return googleScriptLoading;

  googleScriptLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Identity Services"));
    document.head.appendChild(script);
  });

  return googleScriptLoading;
}

export async function getGoogleAccessToken(scopes: string[] = ["openid", "email", "profile"]): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID env var");
  }

  await loadGoogleScript();

  return new Promise<string>((resolve, reject) => {
    try {
      const g = (window as any).google;
      if (!g?.accounts?.oauth2?.initTokenClient) {
        reject(new Error("Google OAuth client unavailable"));
        return;
      }

      const tokenClient = g.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: scopes.join(" "),
        callback: (tokenResponse: any) => {
          const token = tokenResponse?.access_token as string | undefined;
          if (token) {
            resolve(token);
          } else {
            reject(new Error("No access token returned by Google"));
          }
        },
      });

      tokenClient.requestAccessToken();
    } catch (e) {
      reject(e as Error);
    }
  });
}
