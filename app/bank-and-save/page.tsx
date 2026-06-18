import Image from "next/image";
import Link from "next/link";

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-accent">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function BankAndSavePage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Smart banking that rewards you
              </h1>
              <p className="text-pretty text-lg text-muted-foreground md:text-xl">
                No monthly fees. No surprises. Just straightforward banking with great benefits.
              </p>
            </div>
            <div className="relative hidden lg:block">
              <Image
                alt="Bank and Save"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                src="/images/high-interest-savings-account-growth-chart-financi.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Everyday Account */}
            <div className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-blue-500/20 bg-blue-500/5">
              <div className="px-6">
                <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-700">
                  Transaction Account
                </span>
                <div className="font-semibold text-2xl mt-4">Everyday Account</div>
                <div className="text-muted-foreground text-sm mt-1">Deposit $1,000+ per month from external source</div>
              </div>
              <div className="px-6">
                <div className="mb-6 space-y-3">
                  {["Unlimited fee-free transactions", "1% cashback on utility bills", "Up to 5 rebated ATM withdrawals per month", "Instant payment notifications", "Apple Pay & Google Pay"].map((f) => (
                    <div key={f} className="flex items-start gap-2"><CheckIcon /><span className="text-sm leading-relaxed">{f}</span></div>
                  ))}
                </div>
                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Fee</span><span className="font-semibold">$0</span>
                  </div>
                </div>
                <Link href="/sign-up" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 mt-6 w-full gap-2">
                  Open Account
                </Link>
              </div>
            </div>

            {/* Savings Maximiser */}
            <div className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-green-500/20 bg-green-500/5">
              <div className="px-6">
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium bg-green-500/10 text-green-700">
                    High Interest Savings
                  </span>
                  <div className="text-right">
                    <div className="text-3xl font-bold">4.50%</div>
                    <div className="text-xs text-muted-foreground">p.a. variable</div>
                  </div>
                </div>
                <div className="font-semibold text-2xl mt-4">Savings Maximiser</div>
                <div className="text-muted-foreground text-sm mt-1">Grow balance each month (excluding interest) and make 5+ card purchases</div>
              </div>
              <div className="px-6">
                <div className="mb-6 space-y-3">
                  {["High variable interest rate", "No account keeping fees", "24/7 online access", "Link to Everyday Account", "Automatic savings transfers"].map((f) => (
                    <div key={f} className="flex items-start gap-2"><CheckIcon /><span className="text-sm leading-relaxed">{f}</span></div>
                  ))}
                </div>
                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Fee</span><span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Comparison Rate</span><span className="font-semibold">4.50% p.a.</span>
                  </div>
                </div>
                <Link href="/sign-up" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 mt-6 w-full gap-2">
                  Open Account
                </Link>
              </div>
            </div>

            {/* Term Deposit */}
            <div className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-purple-500/20 bg-purple-500/5">
              <div className="px-6">
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium bg-purple-500/10 text-purple-700">
                    Fixed Rate Savings
                  </span>
                  <div className="text-right">
                    <div className="text-3xl font-bold">4.25%</div>
                    <div className="text-xs text-muted-foreground">p.a. variable</div>
                  </div>
                </div>
                <div className="font-semibold text-2xl mt-4">Term Deposit</div>
                <div className="text-muted-foreground text-sm mt-1">Minimum deposit $5,000</div>
              </div>
              <div className="px-6">
                <div className="mb-6 space-y-3">
                  {["Fixed interest rates", "Terms from 3 to 60 months", "Minimum deposit $5,000", "Interest paid at maturity or monthly", "Guaranteed returns"].map((f) => (
                    <div key={f} className="flex items-start gap-2"><CheckIcon /><span className="text-sm leading-relaxed">{f}</span></div>
                  ))}
                </div>
                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Fee</span><span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Comparison Rate</span><span className="font-semibold">4.25% p.a.</span>
                  </div>
                </div>
                <Link href="/sign-up" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 mt-6 w-full gap-2">
                  Open Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Why bank with us?</h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">Experience banking that puts your needs first</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Zero Monthly Fees", desc: "Keep more of your money with no ongoing account fees" },
              { title: "High Interest Rates", desc: "Earn competitive rates on your savings balance" },
              { title: "Instant Access", desc: "24/7 access to your money via app, online or ATM" },
            ].map((c) => (
              <div key={c.title} className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                <div className="px-6 font-semibold text-xl">{c.title}</div>
                <div className="px-6 text-muted-foreground text-sm leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="p-8 text-center md:p-12">
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Ready to start saving?</h2>
              <p className="mx-auto mb-8 max-w-2xl text-pretty text-muted-foreground">Open an account in minutes and start enjoying the benefits today</p>
              <Link href="/sign-up" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6 gap-2">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
