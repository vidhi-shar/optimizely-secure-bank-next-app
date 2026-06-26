"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/bank-and-save", label: "Bank & Save" },
  { href: "/credit-cards", label: "Credit Cards" },
  { href: "/loans", label: "Loans" },
  { href: "/retirement", label: "Retirement" },
  { href: "/calculators", label: "Calculators" },
  { href: "/contact", label: "Contact" },
];

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

// FIX: Read user identity from localStorage which is always reliable in
// production builds. Cookie is still the source of truth for server-side
// auth (sb_session), but localStorage is used for client-side display state
// (username in header) because Next.js production route transitions can cause
// cookies to be temporarily unreadable in useEffect, making the header flash
// to "Login" incorrectly.
function getStoredUser(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sb_user");
}

function setStoredUser(name: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("sb_user", name);
}

function clearStoredUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("sb_user");
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  // FIX: On mount, read from localStorage first (instant, always reliable),
  // then fall back to cookie. This prevents the "Login" flash on page refresh.
  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setUserName(stored);
      return;
    }
    // Fallback: if localStorage is empty, try cookie (e.g. first load after login)
    const cookie = getCookie("sb_user");
    if (cookie) {
      setStoredUser(cookie); // sync into localStorage for future navigations
      setUserName(cookie);
    }
  }, []);

  // FIX: On route change, ONLY sync from cookie into localStorage if the
  // cookie is readable. Never clear userName here — that caused the "anonymous"
  // flash. The only legitimate way to clear it is handleLogout() below.
  useEffect(() => {
    const cookie = getCookie("sb_user");
    if (cookie) {
      setStoredUser(cookie);
      setUserName(cookie);
    }
    // Intentionally no "else" — do not clear state on route change
  }, [pathname]);

  async function handleLogout() {
    // FIX: Clear BOTH cookie and localStorage on logout
    document.cookie = "sb_user=; path=/; max-age=0";
    clearStoredUser();
    setUserName(null);
    await fetch("/api/logout");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-xl font-bold">SecureBank</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {userName ? (
            <>
              <Link
                href="/dashboard"
                className="hidden md:inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Hi, {userName.split(" ")[0]}
              </Link>
              <button
                onClick={handleLogout}
                className="items-center justify-center whitespace-nowrap text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground h-8 rounded-md gap-1.5 px-3 hidden md:inline-flex border"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="items-center justify-center whitespace-nowrap text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground h-8 rounded-md gap-1.5 px-3 hidden md:inline-flex"
            >
              Login
            </Link>
          )}
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md gap-1.5 px-3"
          >
            Open Account
          </Link>
        </div>
      </div>
    </header>
  );
}
