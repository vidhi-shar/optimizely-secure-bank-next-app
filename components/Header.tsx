"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/bank-and-save", label: "Bank & Save" },
  { href: "/credit-cards", label: "Credit Cards" },
  { href: "/loans", label: "Loans" },
  { href: "/retirement", label: "Retirement" },
  { href: "/calculators", label: "Calculators" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

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
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="items-center justify-center whitespace-nowrap text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground h-8 rounded-md gap-1.5 px-3 hidden md:inline-flex"
          >
            Login
          </Link>
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
