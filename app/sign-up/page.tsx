"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const password = fd.get("password") as string;
    const repeat = fd.get("repeat-password") as string;

    if (password !== repeat) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    // Demo — just redirect to login after a brief pause
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    router.push("/login?registered=1");
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
          <div className="px-6">
            <div className="font-semibold text-2xl">Create an Account</div>
            <div className="text-muted-foreground text-sm mt-1">
              Sign up to access your personal banking dashboard
            </div>
          </div>
          <div className="px-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                {error && (
                  <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                {[
                  { id: "fullName", label: "Full Name", type: "text", placeholder: "John Smith", required: true },
                  { id: "email", label: "Email", type: "email", placeholder: "your.email@example.com", required: true },
                  { id: "phone", label: "Phone Number", type: "tel", placeholder: "+61 400 000 000", required: false },
                  { id: "password", label: "Password", type: "password", placeholder: "", required: true },
                  { id: "repeat-password", label: "Repeat Password", type: "password", placeholder: "", required: true },
                ].map((field) => (
                  <div key={field.id} className="grid gap-2">
                    <label className="flex items-center gap-2 text-sm leading-none font-medium" htmlFor={field.id}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 w-full"
                >
                  {loading ? "Creating account..." : "Sign up"}
                </button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link className="underline underline-offset-4 text-primary" href="/login">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
