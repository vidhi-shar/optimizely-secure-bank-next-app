import Banner from "@/components/Banner";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
      </svg>
    ),
    title: "Everyday Banking",
    description: "Fee-free transactions, instant transfers, and cashback rewards on everyday spending",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      </svg>
    ),
    title: "Secure & Protected",
    description: "Bank-grade security with biometric authentication and fraud protection",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: "Smart Savings",
    description: "High-interest savings accounts with no monthly fees and easy goal tracking",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    title: "Mobile First",
    description: "Manage your finances anywhere with our award-winning mobile app",
  },
];

const products = [
  {
    href: "/bank-and-save",
    image: "/images/savings-piggy-bank-with-coins-growing-wealth.jpg",
    title: "Bank & Save",
    description: "High-interest savings accounts and everyday banking with no monthly fees",
    cta: "Explore accounts",
  },
  {
    href: "/credit-cards",
    image: "/images/premium-credit-cards-with-rewards-and-cashback.jpg",
    title: "Credit Cards",
    description: "Rewards, cashback, and premium benefits with competitive interest rates",
    cta: "Compare cards",
  },
  {
    href: "/loans",
    image: "/images/dream-house-with-keys-home-loan-concept.jpg",
    title: "Loans",
    description: "Personal, home, and education loans with flexible terms and competitive rates",
    cta: "View loan options",
  },
  {
    href: "/retirement",
    image: "/images/retirement-planning-couple-enjoying-beach-suns.jpg",
    title: "Retirement Planning",
    description: "Secure your future with smart superannuation and investment options",
    cta: "Plan your retirement",
  },
  {
    href: "/calculators",
    image: "/images/financial-calculator-and-charts-planning-budget.jpg",
    title: "Financial Calculators",
    description: "Plan your finances with our suite of easy-to-use calculators",
    cta: "Use calculators",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner — pulls dynamic content from Optimizely GraphQL */}
      <Banner />

      {/* Why SecureBank */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
              Why choose SecureBank?
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Everything you need to manage your finances with confidence
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
              >
                <div className="px-6">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {f.icon}
                  </div>
                  <div className="font-semibold text-xl mt-2">{f.title}</div>
                </div>
                <div className="px-6">
                  <div className="text-muted-foreground text-sm leading-relaxed">
                    {f.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Our Products</h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Comprehensive financial solutions for every stage of life
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link key={p.href} href={p.href}>
                <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm group h-full transition-all hover:shadow-lg">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      alt={p.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      src={p.image}
                    />
                  </div>
                  <div className="px-6">
                    <div className="leading-none font-semibold group-hover:text-accent">{p.title}</div>
                  </div>
                  <div className="px-6">
                    <div className="text-muted-foreground text-sm leading-relaxed">{p.description}</div>
                    <div className="mt-4 flex items-center text-sm font-medium text-accent">
                      {p.cta}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Mobile Banking card (no link) */}
            <div className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm group h-full border-primary/50 bg-primary/5 transition-all hover:shadow-lg">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  alt="Mobile Banking"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  src="/images/mobile-banking-app-on-smartphone-with-secure-p.jpg"
                />
              </div>
              <div className="px-6">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                    <path d="M12 18h.01" />
                  </svg>
                </div>
                <div className="leading-none font-semibold">Mobile Banking</div>
              </div>
              <div className="px-6">
                <div className="text-muted-foreground text-sm leading-relaxed">
                  Download our award-winning app for banking on the go
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Get the app
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="p-8 text-center md:p-12">
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
                Ready to get started?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-pretty text-muted-foreground">
                Join thousands of satisfied customers who trust SecureBank for their banking needs
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6 gap-2"
                >
                  Open an Account
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-6"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
