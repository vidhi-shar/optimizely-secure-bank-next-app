"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
          <div className="px-6">
            <div className="font-semibold text-2xl">Login to Your Account</div>
            <div className="text-muted-foreground text-sm mt-1">
              Enter your email and password to access your banking dashboard
            </div>
          </div>
          <div className="px-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                {error && (
                  <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                <div className="grid gap-2">
                  <label
                    className="flex items-center gap-2 text-sm leading-none font-medium"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                    placeholder="your.email@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    className="flex items-center gap-2 text-sm leading-none font-medium"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 w-full"
                >
                  {loading ? "Signing in..." : "Login"}
                </button>
              </div>
              <div className="mt-4 text-center text-sm">
                {"Don't have an account? "}
                <Link className="underline underline-offset-4 text-primary" href="/sign-up">
                  Sign up
                </Link>
              </div>
              <div className="mt-6 rounded-md bg-muted/50 border px-4 py-3">
                <p className="text-xs font-medium text-muted-foreground mb-2">Demo credentials:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>john.smith@example.com / SecureBank@123</li>
                  <li>sarah.jones@example.com / Banking@456</li>
                  <li>demo@securebank.com / Demo@2024</li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
