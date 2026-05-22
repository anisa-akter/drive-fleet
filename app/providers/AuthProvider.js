"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshSession = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/auth/me");
      setUser(data?.user || null);
    } catch (err) {
      setUser(null);
      if (err.status && err.status !== 401) {
        setError(err.message || "Unable to verify session.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = useCallback(async ({ email, password }) => {
    setError("");
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser(data?.user || null);
    return data;
  }, []);

  const register = useCallback(async ({ name, email, photoUrl, password }) => {
    setError("");
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, photoUrl, password }),
    });
  }, []);

  const logout = useCallback(async () => {
    setError("");
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  }, []);

  const googleLogin = useCallback(async () => {
    setError("");
    const data = await apiFetch("/auth/google", { method: "POST" });
    setUser(data?.user || null);
    return data;
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
    [user, loading, error, login, register, logout, googleLogin, refreshSession]
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
