import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export default AuthProvider;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("loginToken");
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Error checking auth:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (token: string) => {
    await AsyncStorage.setItem("loginToken", token);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("loginToken");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Auth protection logic
  useEffect(() => {
    if (isLoading) return;

    const inPublicRoute =
      segments[0] === "welcome" ||
      segments[0] === "login" ||
      segments[0] === "signup" ||
      segments[0] === "onboarding" ||
      (segments[0] as string) === "forgotPassword";

    if (!isAuthenticated && !inPublicRoute) {
      // User not logged in and not on a public route → force to login
      router.replace("/login");
    } else if (
      isAuthenticated &&
      (segments[0] === "login" ||
        segments[0] === "signup" ||
        segments[0] === "welcome" ||
        segments[0] === "onboarding")
    ) {
      // User already logged in, redirect to home from login/signup/welcome/onboarding
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, segments, isLoading]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, signIn, signOut, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
