"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import SectionHeader from "../components/SectionHeader";
import { useAuth } from "../providers/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login, googleLogin, error, setError } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await login(formData);
      setMessage("Welcome back. Redirecting to home.");
      router.push("/");
    } catch (err) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await googleLogin();
      router.push("/");
    } catch (err) {
      setError(err.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <Container className="max-w-xl">
        <div className="lux-card rounded-3xl p-8">
          <SectionHeader
            title="Login"
            subtitle="Access your bookings, saved cars, and host dashboard."
          />
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="input border border-gray-300 rounded-lg mt-2 w-full"
                placeholder="you@email.com"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="input border border-gray-300 rounded-lg mt-2 w-full"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                required
              />
            </div>
            {error ? <p className="text-sm text-error">{error}</p> : null}
            {message ? <p className="text-sm text-success">{message}</p> : null}
            <button type="submit" className="btn btn-drive w-full rounded-full" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
          <button
            type="button"
            className="btn btn-outline-drive mt-4 w-full rounded-full"
            onClick={handleGoogle}
            disabled={loading}
          >
            Continue with Google
          </button>
          <p className="mt-6 text-sm text-black/70">
            New to DriveFleet? <Link className="underline" href="/register">Create an account</Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
