"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import SectionHeader from "../components/SectionHeader";
import { useAuth } from "../providers/AuthProvider";

const passwordRules = {
  minLength: 6,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
};

export default function RegisterPage() {
  const router = useRouter();
  const { register, googleLogin, error, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");

  const validatePassword = (password) => {
    if (password.length < passwordRules.minLength) {
      return "Password must be at least 6 characters.";
    }
    if (!passwordRules.uppercase.test(password)) {
      return "Password must include one uppercase letter.";
    }
    if (!passwordRules.lowercase.test(password)) {
      return "Password must include one lowercase letter.";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    const validation = validatePassword(formData.password);
    if (validation) {
      setPasswordError(validation);
      return;
    }
    setPasswordError("");
    setLoading(true);
    try {
      await register(formData);
      setMessage("Registration successful. Redirecting to login.");
      router.push("/login");
    } catch (err) {
      setError(err.message || "Registration failed.");
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
      setError(err.message || "Google sign-up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <Container className="max-w-xl">
        <div className="lux-card rounded-3xl p-8">
          <SectionHeader
            title="Register"
            subtitle="Create a DriveFleet account and unlock premium rentals."
          />
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="input border border-gray-300 rounded-lg mt-2 w-full"
                placeholder="Your full name"
                value={formData.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="input border border-gray-300 rounded-lg mt-2 w-full"
                placeholder="you@email.com"
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Photo URL</label>
              <input
                type="url"
                className="input border border-gray-300 rounded-lg mt-2 w-full"
                placeholder="https://"
                value={formData.photoUrl}
                onChange={(event) =>
                  setFormData({ ...formData, photoUrl: event.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="input border border-gray-300 rounded-lg mt-2 w-full"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
                required
              />
            </div>
            {passwordError ? (
              <p className="text-sm text-error">{passwordError}</p>
            ) : null}
            {error ? <p className="text-sm text-error">{error}</p> : null}
            {message ? <p className="text-sm text-success">{message}</p> : null}
            <button
              type="submit"
              className="btn btn-drive w-full rounded-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
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
            Already have an account?{" "}
            <Link className="underline" href="/login">
              Login
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
