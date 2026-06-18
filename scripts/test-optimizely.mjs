/**
 * Run from the project root:
 *   node scripts/test-optimizely.mjs
 *
 * Make sure .env.local is set up with:
 *   OPTIMIZELY_GRAPH_GATEWAY=https://cg.optimizely.com
 *   OPTIMIZELY_GRAPH_SINGLE_KEY=your_key_here
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// ---------------------------------------------------------------------------
// Load .env.local manually (no dotenv dependency needed)
// ---------------------------------------------------------------------------
function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      process.env[key.trim()] = rest.join("=").trim();
    }
  } catch {
    console.warn("⚠️  No .env.local found — using process environment variables.");
  }
}

loadEnv();

const GATEWAY   = process.env.OPTIMIZELY_GRAPH_GATEWAY  ?? "https://cg.optimizely.com";
const SINGLE_KEY = process.env.OPTIMIZELY_GRAPH_SINGLE_KEY ?? "";

if (!SINGLE_KEY) {
  console.error("❌  OPTIMIZELY_GRAPH_SINGLE_KEY is not set in .env.local");
  process.exit(1);
}

const QUERY = `
  query TestHeroBanner {
    HeroBannerBlock(limit: 1, orderBy: { _metadata: { published: DESC } }) {
      items {
        _metadata { name published }
        Heading
        SubHeading
        BadgeText
        CtaPrimaryLabel
        CtaSecondaryLabel
        Image { url { default } }
        ImageAltText
      }
    }
  }
`;

async function run() {
  const url = `${GATEWAY}/content/v2?auth=${SINGLE_KEY}`;
  console.log(`\n🔍  Querying: ${GATEWAY}/content/v2`);
  console.log(`🔑  Key:      ${SINGLE_KEY.slice(0, 8)}${"*".repeat(8)}\n`);

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
    });
  } catch (err) {
    console.error("❌  Network error — cannot reach cg.optimizely.com");
    console.error("   ", err.message);
    process.exit(1);
  }

  if (res.status === 401) {
    console.error("❌  401 Unauthorized — check your OPTIMIZELY_GRAPH_SINGLE_KEY");
    process.exit(1);
  }

  if (!res.ok) {
    console.error(`❌  HTTP ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const json = await res.json();

  if (json.errors?.length) {
    console.error("❌  GraphQL errors:");
    json.errors.forEach((e) => console.error("  •", e.message));
    process.exit(1);
  }

  const items = json?.data?.HeroBannerBlock?.items ?? [];

  if (items.length === 0) {
    console.warn("⚠️  Connected successfully but no HeroBannerBlock items found.");
    console.warn("   Make sure you have PUBLISHED a HeroBannerBlock in the CMS");
    console.warn("   and waited ~2 minutes for Content Graph to index it.\n");
    process.exit(0);
  }

  const item = items[0];
  console.log("✅  HeroBannerBlock fetched successfully!\n");
  console.log("─".repeat(50));
  console.log("  Name:       ", item._metadata?.name);
  console.log("  Published:  ", item._metadata?.published);
  console.log("  Heading:    ", item.Heading);
  console.log("  SubHeading: ", item.SubHeading?.slice(0, 60) + "…");
  console.log("  Badge:      ", item.BadgeText);
  console.log("  CTA Primary:", item.CtaPrimaryLabel);
  console.log("  CTA Second.:", item.CtaSecondaryLabel);
  console.log("  Image URL:  ", item.Image?.url?.default ?? "(none)");
  console.log("  Image Alt:  ", item.ImageAltText);
  console.log("─".repeat(50));
  console.log("\n🎉  Your Next.js app will use this content on the home page.\n");
}

run();
