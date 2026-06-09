import { http } from "./http";

export type GoogleUserInfo = {
  id: string;
  email: string;
  name: string;
  picture?: string;
};

export async function googleLoginOnBackend(userInfo: GoogleUserInfo): Promise<string> {
  const response = await http.post<{ token: string }>("/users/google-login", {
    email: userInfo.email,
    name: userInfo.name,
    googleId: userInfo.id,
  });
  if (!response.token) throw new Error("No token returned from server");
  return response.token;
}

// Hook dùng cho mobile (expo-auth-session)
export function useGoogleAuth() {
  // Lazy import để tránh lỗi trên web
  const { Platform } = require("react-native");
  if (Platform.OS === "web") {
    // Web dùng @react-oauth/google thay thế
    return { request: null, response: null, promptAsync: async () => {} };
  }

  const AuthSession = require("expo-auth-session");
  const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
  };
  const redirectUri = AuthSession.makeRedirectUri({ scheme: "ecommerceapp" });
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || "",
      scopes: ["openid", "profile", "email"],
      redirectUri,
      responseType: AuthSession.ResponseType.Token,
      usePKCE: false,
    },
    discovery
  );
  return { request, response, promptAsync };
}
