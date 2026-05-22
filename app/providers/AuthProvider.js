"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authClient } from "../lib/authClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshSession = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error } = await authClient.getSession();
      if (error) {
        throw new Error(error.message || "Unable to verify session.");
      }
      setUser(data?.user || null);
    } catch (err) {
      setUser(null);
      setError(err.message || "Unable to verify session.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = useCallback(async ({ email, password }) => {
    setError("");
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message || "Invalid credentials.");
    }
    setUser(data?.user || null);
    return data;
  }, []);

  const register = useCallback(async ({ name, email, photoUrl, password }) => {
    setError("");
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoUrl || undefined,
    });
    if (error) {
      throw new Error(error.message || "Registration failed.");
    }
    return data;
  }, []);

  const logout = useCallback(async () => {
    setError("");
    try {
      await authClient.signOut();
    } finally {
      setUser(null);
    }
  }, []);

  const googleLogin = useCallback(async () => {
    setError("");
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/login",
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
      googleLogin,
      refreshSession,
      setError,
    }),
    [
      user,
      loading,
      error,
      login,
      register,
      logout,
      googleLogin,
      refreshSession,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
