import { createAuthClient } from "better-auth/react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const authClient = createAuthClient({
  baseURL: `${API_BASE}/api/auth`,
});
