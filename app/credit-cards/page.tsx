import Image from "next/image";
import Link from "next/link";

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-accent">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const cards = [
  {
    badge: "Most Popular",
    badgeColor: "bg-yellow-500/10 text-yellow-700",
    borderColor: "border-yellow-500/20 bg-yellow-500/5",
    image: "/images/premium-gold-credit-card-with-metallic-finish.jpg",
    title: "Platinum Rewards",
    rate: "19.99%",
    annualFee: "$149",
    features: ["Earn 1.5 points per $1 spent", "60,000 bonus points on sign-up", "Complimentary travel insurance", "Airport lounge access", "0% balance transfer for 12 months"],
  },
  {
    badge: "Low Rate",
    badgeColor: "bg-blue-500/10 text-blue-700",
    borderColor: "border-blue-500/20 bg-blue-500/5",
    image: "/images/platinum-blue-credit-card-modern-sleek-design.jpg",
    title: "Low Rate Card",
    rate: "9.99%",
    annualFee: "$59",
    features: ["Low ongoing purchase rate", "Up to 55 days interest free", "No foreign transaction fees", "Apple Pay & Google Pay", "24/7 fraud monitoring"],
  },
  {
    badge: "Cashback",
    badgeColor: "bg-green-500/10 text-green-700",
    borderColor: "border-green-500/20 bg-green-500/5",
    image: "/images/classic-green-credit-card-simple-elegant-design.jpg",
    title: "Cashback Card",
    rate: "14.99%",
    annualFee: "$0",
    features: ["2% cashback at supermarkets", "1% cashback everywhere else", "No annual fee ever", "Contactless payments", "Instant spend notifications"],
  },
];

export default function CreditCardsPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Credit cards that work for you
              </h1>
              <p className="text-pretty text-lg text-muted-foreground md:text-xl">
                Choose the card that suits your lifestyle with rewards, low rates, or cashback.
              </p>
            </div>
            <div className="relative hidden lg:block">
              <Image alt="Credit Cards" width={600} height={400} className="rounded-lg shadow-2xl" src="/images/stack-of-premium-credit-cards-with-rewards-cas.jpg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {cards.map((card) => (
              <div key={card.title} className={`text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm ${card.borderColor}`}>
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image alt={card.title} fill className="object-cover" src={card.image} />
                </div>
                <div className="px-6">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${card.badgeColor}`}>{card.badge}</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{card.rate}</div>
                      <div className="text-xs text-muted-foreground">p.a. purchase rate</div>
                    </div>
                  </div>
                  <div className="font-semibold text-2xl">{card.title}</div>
                </div>
                <div className="px-6">
                  <div className="mb-6 space-y-3">
                    {card.features.map((f) => (
                      <div key={f} className="flex items-start gap-2"><CheckIcon /><span className="text-sm leading-relaxed">{f}</span></div>
                    ))}
                  </div>
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Annual Fee</span><span className="font-semibold">{card.annualFee}</span>
                    </div>
                  </div>
                  <Link href="/sign-up" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 mt-6 w-full">
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
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Not sure which card is right for you?</h2>
              <p className="mx-auto mb-8 max-w-2xl text-pretty text-muted-foreground">Our team can help you find the perfect card for your lifestyle and spending habits</p>
              <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6">
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
