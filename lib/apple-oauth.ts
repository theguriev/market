"use client";

let appleScriptLoading: Promise<void> | null = null;
let appleInitialized = false;

function loadAppleScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (appleScriptLoading) return appleScriptLoading;

  appleScriptLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector(
      'script[src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"]'
    );
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Apple Sign-In JS"));
    document.head.appendChild(script);
  });

  return appleScriptLoading;
}

function initApple(): void {
  if (appleInitialized) return;
  const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("Missing NEXT_PUBLIC_APPLE_CLIENT_ID env var");
  }

  const redirectURI = typeof window !== "undefined" ? `${window.location.origin}/login` : undefined;
  const AppleID = (window as any).AppleID;
  if (!AppleID?.auth) {
    throw new Error("AppleID auth unavailable");
  }
  AppleID.auth.init({
    clientId,
    scope: "name email",
    redirectURI,
    usePopup: true,
  });
  appleInitialized = true;
}

export async function getAppleIdToken(): Promise<string> {
  await loadAppleScript();
  initApple();
  return new Promise<string>((resolve, reject) => {
    const AppleID = (window as any).AppleID;
    try {
      AppleID.auth
        .signIn()
        .then((response: any) => {
          const idToken = response?.authorization?.id_token as string | undefined;
          const code = response?.authorization?.code as string | undefined;
          if (idToken) {
            resolve(idToken);
          } else if (code) {
            // Some backends may accept authorization code; if needed, switch to code
            resolve(code);
          } else {
            reject(new Error("No token returned by Apple"));
          }
        })
        .catch((err: any) => {
          reject(err instanceof Error ? err : new Error("Apple sign-in failed"));
        });
    } catch (e) {
      reject(e as Error);
    }
  });
}
