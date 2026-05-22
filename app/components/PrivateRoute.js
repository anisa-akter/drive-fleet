"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";
import LoadingSpinner from "./LoadingSpinner";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <LoadingSpinner label="Checking session" />;
  }

  if (!user) {
    return (
      <div className="py-16 text-center text-sm text-black/70">
        Redirecting to login...
      </div>
    );
  }

  return children;
}
