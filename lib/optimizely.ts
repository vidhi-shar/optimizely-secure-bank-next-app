export interface HeroBanner {
  heading: string;
  subheading: string;
  badge: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  imageSrc: string;
  imageAlt: string;
}

const FALLBACK_BANNER: HeroBanner = {
  heading: "Banking made simple, savings made easy",
  subheading:
    "Experience banking designed around you with competitive rates, zero fees, and 24/7 access to your money",
  badge: "Earn up to 4.5% p.a. on savings",
  ctaPrimaryLabel: "Open Account",
  ctaSecondaryLabel: "Learn More",
  imageSrc: "/images/modern-banking-app-interface-on-smartphone-wit.jpg",
  imageAlt: "Banking Dashboard",
};

const HERO_BANNER_QUERY = `
  query GetHeroBanner {
    HeroBannerBlock(limit: 1) {
      items {
        Heading
        SubHeading
        BadgeText
        CtaPrimaryLabel
        CtaSecondaryLabel
        Image {
          url {
            default
          }
        }
        ImageAltText
      }
    }
  }
`;

export async function fetchHeroBanner(): Promise<HeroBanner> {
  const gateway = process.env.OPTIMIZELY_GRAPH_GATEWAY;
  const singleKey = process.env.OPTIMIZELY_GRAPH_SINGLE_KEY;

  if (!gateway || !singleKey) {
    return FALLBACK_BANNER;
  }

  try {
    const endpoint = `${gateway}/content/v2?auth=${singleKey}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: HERO_BANNER_QUERY }),
      next: { revalidate: 60 },
    });

    if (!response.ok) return FALLBACK_BANNER;

    const json = await response.json();
    const item = json?.data?.HeroBannerBlock?.items?.[0];

    if (!item) return FALLBACK_BANNER;

    return {
      heading: item.Heading ?? FALLBACK_BANNER.heading,
      subheading: item.SubHeading ?? FALLBACK_BANNER.subheading,
      badge: item.BadgeText ?? FALLBACK_BANNER.badge,
      ctaPrimaryLabel: item.CtaPrimaryLabel ?? FALLBACK_BANNER.ctaPrimaryLabel,
      ctaSecondaryLabel: item.CtaSecondaryLabel ?? FALLBACK_BANNER.ctaSecondaryLabel,
      imageSrc: item.Image?.url?.default ?? FALLBACK_BANNER.imageSrc,
      imageAlt: item.ImageAltText ?? FALLBACK_BANNER.imageAlt,
    };
  } catch {
    return FALLBACK_BANNER;
  }
}
