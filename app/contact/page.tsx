"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  const contacts = [
    { icon: "📞", title: "Phone", lines: ["1800 123 456", "Mon–Fri 8am–8pm AEST", "Sat–Sun 9am–5pm AEST"] },
    { icon: "✉️", title: "Email", lines: ["support@securebank.com", "We reply within 24 hours"] },
    { icon: "💬", title: "Live Chat", lines: ["Available 24/7 via our", "mobile app and website"] },
    { icon: "🏦", title: "Branch", lines: ["Find your nearest branch", "at securebank.com/branches"] },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">Get in touch</h1>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Our team is here to help you with any questions about your banking needs
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {contacts.map((c) => (
              <div key={c.title} className="bg-card text-card-foreground flex flex-col gap-4 rounded-xl border py-6 shadow-sm px-6 text-center">
                <div className="text-3xl">{c.icon}</div>
                <div className="font-semibold text-lg">{c.title}</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  {c.lines.map((l) => <p key={l}>{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
              <div className="px-6">
                <div className="font-semibold text-2xl">Send us a message</div>
                <div className="text-muted-foreground text-sm mt-1">Fill in the form and we&apos;ll get back to you within 24 hours</div>
              </div>
              <div className="px-6">
                {submitted ? (
                  <div className="rounded-md bg-accent/10 border border-accent/20 px-6 py-8 text-center">
                    <div className="text-3xl mb-3">✅</div>
                    <div className="font-semibold text-lg mb-1">Message sent!</div>
                    <p className="text-sm text-muted-foreground">Thank you for reaching out. We&apos;ll be in touch within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                      <div className="grid gap-2 md:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium" htmlFor="firstName">First Name</label>
                          <input id="firstName" type="text" required placeholder="John" className="border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] md:text-sm mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium" htmlFor="lastName">Last Name</label>
                          <input id="lastName" type="text" required placeholder="Smith" className="border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] md:text-sm mt-1" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="email">Email</label>
                        <input id="email" type="email" required placeholder="john@example.com" className="border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] md:text-sm" />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="subject">Subject</label>
                        <select id="subject" className="border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] md:text-sm">
                          <option>General Enquiry</option>
                          <option>Account Opening</option>
                          <option>Loan Application</option>
                          <option>Credit Card</option>
                          <option>Technical Support</option>
                          <option>Complaint</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="message">Message</label>
                        <textarea id="message" required rows={4} placeholder="How can we help you?" className="border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] md:text-sm resize-none" />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 w-full"
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
