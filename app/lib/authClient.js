import { createAuthClient } from "better-auth/react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://drive-fleet-backend-eight.vercel.app";

export const authClient = createAuthClient({
  baseURL: `${API_BASE}/api/auth`,
});
