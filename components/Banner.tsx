import Image from "next/image";
import Link from "next/link";
import { fetchHeroBanner } from "@/lib/optimizely";

export default async function Banner() {
  const banner = await fetchHeroBanner();

  // CMS images are served from Optimizely's CDN (absolute URL).
  // Local fallback images start with "/" and are served from /public.
  const isExternalImage = banner.imageSrc.startsWith("http");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              {banner.badge}
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
              {banner.heading}
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              {banner.subheading}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6 gap-2"
              >
                {banner.ctaPrimaryLabel}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/bank-and-save"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-6"
              >
                {banner.ctaSecondaryLabel}
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            {isExternalImage ? (
              /* External CMS image — use a plain <img> to avoid next.config domain rules */
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={banner.imageAlt}
                src={banner.imageSrc}
                width={600}
                height={500}
                className="rounded-lg shadow-2xl object-cover"
              />
            ) : (
              /* Local /public image — use next/image for optimisation */
              <Image
                alt={banner.imageAlt}
                width={600}
                height={500}
                className="rounded-lg shadow-2xl object-cover"
                src={banner.imageSrc}
                priority
              />
            )}
          </div>
        </div>
      </div>

      {/* Dev-only badge so you can tell at a glance where the content is coming from */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute bottom-2 right-3 rounded-full border px-2 py-0.5 text-xs opacity-60">
          {banner.fromCMS ? "⚡ Optimizely CMS" : "📄 Static fallback"}
        </div>
      )}
    </section>
  );
}
