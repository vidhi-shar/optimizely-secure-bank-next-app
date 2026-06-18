import Image from "next/image";
import Link from "next/link";

export default function RetirementPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Secure your retirement with confidence
              </h1>
              <p className="text-pretty text-lg text-muted-foreground md:text-xl">
                Smart superannuation and investment solutions to help you enjoy the retirement you deserve.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:justify-start">
                <Link href="/calculators" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6 gap-2">
                  Retirement Calculator
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium border bg-background hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-6">
                  Speak to an Advisor
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <Image alt="Retirement Planning" width={600} height={400} className="rounded-lg shadow-2xl" src="/images/retirement-planning-couple-enjoying-beach-sunset.jpg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Our Superannuation Fund</h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">Choose the investment option that aligns with your retirement goals</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Conservative", returnRate: "4–5%", risk: "Low", desc: "Capital preservation with stable, lower-risk investments in cash and fixed income", color: "border-blue-500/20 bg-blue-500/5", badge: "bg-blue-500/10 text-blue-700" },
              { title: "Balanced", returnRate: "6–8%", risk: "Medium", desc: "A mix of growth and defensive assets for steady long-term returns", color: "border-green-500/20 bg-green-500/5", badge: "bg-green-500/10 text-green-700", popular: true },
              { title: "Growth", returnRate: "8–10%", risk: "High", desc: "Maximise long-term growth with a focus on Australian and international shares", color: "border-orange-500/20 bg-orange-500/5", badge: "bg-orange-500/10 text-orange-700" },
            ].map((opt) => (
              <div key={opt.title} className={`text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm ${opt.color}`}>
                <div className="px-6">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${opt.badge}`}>{opt.risk} Risk</span>
                    {opt.popular && <span className="text-xs font-medium text-accent">Most Popular</span>}
                  </div>
                  <div className="font-semibold text-2xl">{opt.title}</div>
                  <div className="text-3xl font-bold mt-2">{opt.returnRate}<span className="text-sm font-normal text-muted-foreground"> p.a. target</span></div>
                </div>
                <div className="px-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">{opt.desc}</p>
                  <Link href="/sign-up" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 mt-6 w-full">
                    Choose {opt.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Why choose SecureBank Super?</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Low Fees", desc: "One of the lowest fee structures in the industry — more money working for you" },
              { title: "Strong Returns", desc: "Consistent above-average returns across all investment options" },
              { title: "Insurance Cover", desc: "Default life, TPD and income protection insurance included" },
              { title: "Online Tools", desc: "Manage your super anytime with our award-winning digital platform" },
            ].map((b) => (
              <div key={b.title} className="bg-card text-card-foreground flex flex-col gap-4 rounded-xl border py-6 shadow-sm px-6">
                <div className="font-semibold text-lg">{b.title}</div>
                <div className="text-muted-foreground text-sm leading-relaxed">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="p-8 text-center md:p-12">
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Start planning your retirement today</h2>
              <p className="mx-auto mb-8 max-w-2xl text-pretty text-muted-foreground">Use our retirement calculator to estimate your superannuation balance at retirement</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/calculators" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6">
                  Retirement Calculator
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border bg-background hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-6">
                  Get Advice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
