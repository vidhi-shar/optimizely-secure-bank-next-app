export interface HeroBanner {
  heading: string;
  subheading: string;
  badge: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  imageSrc: string;
  imageAlt: string;
  /** true = content came from Optimizely CMS; false = static fallback */
  fromCMS: boolean;
}

const FALLBACK_BANNER: HeroBanner = {
  heading: "Banking made simple, savings made easy",
  subheading:
    "Experience banking designed around you with competitive rates, zero fees, and 24/7 access to your money",
  badge: "Earn up to 4.5% p.a. on savings",
  ctaPrimaryLabel: "Open Account",
  ctaSecondaryLabel: "Learn More",
  imageSrc: "/images/modern-banking-app-interface-on-smartphone-with-fi.jpg",
  imageAlt: "Banking Dashboard",
  fromCMS: false,
};

// Fetches the most-recently published HeroBannerBlock from Optimizely Content Graph.
// orderBy published DESC guarantees the latest editor-published content wins.
const HERO_BANNER_QUERY = `
  query GetHeroBanner {
    HeroBannerBlock(
      limit: 1
      orderBy: { _metadata: { published: DESC } }
    ) {
      items {
        _metadata {
          name
          published
        }
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

  // Return static fallback immediately if credentials are not configured
  if (!gateway || !singleKey) {
    return FALLBACK_BANNER;
  }

  try {
    const endpoint = `${gateway}/content/v2?auth=${singleKey}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: HERO_BANNER_QUERY }),
      // ISR: re-fetch from Optimizely at most once per minute
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(`[Optimizely] Content Graph returned ${response.status} — using fallback`);
      return FALLBACK_BANNER;
    }

    const json = await response.json();

    // Surface any GraphQL-level errors without crashing
    if (json.errors?.length) {
      console.warn("[Optimizely] GraphQL errors:", json.errors);
      return FALLBACK_BANNER;
    }

    const item = json?.data?.HeroBannerBlock?.items?.[0];

    // No published content yet — fall back gracefully
    if (!item) {
      console.info("[Optimizely] No HeroBannerBlock items found — using fallback");
      return FALLBACK_BANNER;
    }

    return {
      heading: item.Heading ?? FALLBACK_BANNER.heading,
      subheading: item.SubHeading ?? FALLBACK_BANNER.subheading,
      badge: item.BadgeText ?? FALLBACK_BANNER.badge,
      ctaPrimaryLabel: item.CtaPrimaryLabel ?? FALLBACK_BANNER.ctaPrimaryLabel,
      ctaSecondaryLabel: item.CtaSecondaryLabel ?? FALLBACK_BANNER.ctaSecondaryLabel,
      // If the CMS image URL is set use it; otherwise keep the local asset
      imageSrc: item.Image?.url?.default ?? FALLBACK_BANNER.imageSrc,
      imageAlt: item.ImageAltText ?? FALLBACK_BANNER.imageAlt,
      fromCMS: true,
    };
  } catch (err) {
    console.error("[Optimizely] Unexpected error fetching banner:", err);
    return FALLBACK_BANNER;
  }
}
