const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let payload = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    payload = await response.json();
  }

  if (!response.ok) {
    const message = payload?.message || "Request failed. Please try again.";
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export function buildQuery(params = {}) {
  const entries = Object.entries(params).filter(([, value]) => value);
  if (!entries.length) return "";
  const query = new URLSearchParams(entries);
  return `?${query.toString()}`;
}
