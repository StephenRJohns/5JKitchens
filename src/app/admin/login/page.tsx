"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/users");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bark-800 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-3" aria-hidden="true">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <circle cx="20" cy="20" r="19" fill="#FAF5E8" opacity="0.15" />
              <text x="20" y="26" textAnchor="middle" fill="#FAF5E8" fontSize="12" fontFamily="serif" fontWeight="bold">5J</text>
            </svg>
          </div>
          <h1 className="font-serif text-2xl font-bold text-cream-100">5J Kitchens Admin</h1>
          <p className="text-bark-400 text-sm mt-1">Sign in to the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl p-8 rounded-sm" noValidate>
          <div className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-bark-700 uppercase tracking-wide mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-bark-800 font-sans focus:outline-none focus:border-bark-500 focus:ring-1 focus:ring-bark-500 rounded-sm"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-bark-700 uppercase tracking-wide mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 border border-cream-300 bg-cream-50 text-bark-800 font-sans focus:outline-none focus:border-bark-500 focus:ring-1 focus:ring-bark-500 rounded-sm"
                placeholder="Enter password"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-rust-500 bg-rust-100 border border-rust-200 px-3 py-2 rounded-sm" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
