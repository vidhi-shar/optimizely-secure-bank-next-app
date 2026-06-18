import Image from "next/image";
import Link from "next/link";

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-accent">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const loans = [
  {
    badge: "Personal Loan",
    badgeColor: "bg-blue-500/10 text-blue-700",
    borderColor: "border-blue-500/20 bg-blue-500/5",
    title: "Personal Loan",
    rate: "From 8.99%",
    image: "/images/mobile-banking-app-on-smartphone-with-secure-payme.jpg",
    features: ["Borrow from $5,000 to $50,000", "Fixed repayments", "1 to 7 year terms", "No early repayment fees", "Fast online approval"],
    monthlyFee: "$0",
  },
  {
    badge: "Home Loan",
    badgeColor: "bg-green-500/10 text-green-700",
    borderColor: "border-green-500/20 bg-green-500/5",
    title: "Home Loan",
    rate: "From 5.89%",
    image: "/images/happy-family-in-new-home-with-keys-home-loan-appro.jpg",
    features: ["Variable and fixed rate options", "Offset account available", "Up to 30 year term", "Extra repayments allowed", "Online redraw facility"],
    monthlyFee: "$8/mo",
  },
  {
    badge: "Education Loan",
    badgeColor: "bg-purple-500/10 text-purple-700",
    borderColor: "border-purple-500/20 bg-purple-500/5",
    title: "Education Loan",
    rate: "From 6.49%",
    image: "/images/financial-calculator-and-charts-planning-budget.jpg",
    features: ["Cover tuition and living costs", "Repayment holiday during study", "Up to $100,000", "Flexible repayment schedule", "No application fee"],
    monthlyFee: "$0",
  },
];

export default function LoansPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Loans to help you achieve your goals
              </h1>
              <p className="text-pretty text-lg text-muted-foreground md:text-xl">
                Competitive rates and flexible terms for every stage of life.
              </p>
            </div>
            <div className="relative hidden lg:block">
              <Image alt="Loans" width={600} height={400} className="rounded-lg shadow-2xl" src="/images/dream-house-with-keys-home-loan-concept.jpg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {loans.map((loan) => (
              <div key={loan.title} className={`text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm ${loan.borderColor}`}>
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image alt={loan.title} fill className="object-cover" src={loan.image} />
                </div>
                <div className="px-6">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${loan.badgeColor}`}>{loan.badge}</span>
                    <div className="text-right">
                      <div className="text-xl font-bold">{loan.rate}</div>
                      <div className="text-xs text-muted-foreground">p.a. comparison rate</div>
                    </div>
                  </div>
                  <div className="font-semibold text-2xl">{loan.title}</div>
                </div>
                <div className="px-6">
                  <div className="mb-6 space-y-3">
                    {loan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2"><CheckIcon /><span className="text-sm leading-relaxed">{f}</span></div>
                    ))}
                  </div>
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly Fee</span><span className="font-semibold">{loan.monthlyFee}</span>
                    </div>
                  </div>
                  <Link href="/calculators" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mt-4 w-full">
                    Calculate Repayments
                  </Link>
                  <Link href="/sign-up" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 mt-2 w-full">
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="p-8 text-center md:p-12">
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Ready to apply?</h2>
              <p className="mx-auto mb-8 max-w-2xl text-pretty text-muted-foreground">Get a decision in minutes with our fast online application</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/sign-up" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6">
                  Apply Online
                </Link>
                <Link href="/calculators" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border bg-background hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-6">
                  Use Our Calculator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
