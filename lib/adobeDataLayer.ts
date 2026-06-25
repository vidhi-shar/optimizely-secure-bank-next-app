/**
 * lib/adobeDataLayer.ts
 *
 * Adobe digitalData layer helper for the Optimizely headless Next.js app.
 *
 * In AEM the digitalData object was populated via an inline <script> that
 * parsed the AEM content path (/content/securebank/us/en/...).
 * In this headless Next.js app we derive the same values from the Next.js
 * router pathname and populate window.digitalData before Launch fires.
 *
 * Usage:
 *   import { initDigitalData, updateDigitalData } from "@/lib/adobeDataLayer";
 */

export interface DigitalData {
  pageName: string;
  pageUrl: string;
  pageSection: string;
  language: string;
  userName: string;
  userEmail: string;
  userImage: string;
}

declare global {
  interface Window {
    digitalData: Partial<DigitalData>;
  }
}

/**
 * Derives pageName and pageSection from a Next.js pathname.
 *
 * AEM equivalent:
 *   var basePath = "/content/securebank/us/en/";
 *   pageSection = rest ? rest.split("/")[0].replace(/\.html$/i, "") : "home";
 *
 * In Next.js there is no /content/securebank/us/en/ prefix — the pathname
 * IS the semantic path, e.g. "/credit-cards". We map it the same way:
 *   pageName    = last path segment (or "home" for "/")
 *   pageSection = first path segment (or "home" for "/")
 */
export function derivePageInfo(pathname: string): {
  pageName: string;
  pageSection: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const pageName = segments.length ? segments[segments.length - 1] : "home";
  const pageSection = segments.length ? segments[0] : "home";
  return { pageName, pageSection };
}

/**
 * Initialise (or reinitialise) window.digitalData for the current page.
 * Preserves any user fields already set (e.g. after login).
 *
 * @param pathname  - Next.js pathname from usePathname()
 * @param overrides - Optional fields to merge in (e.g. userName after login)
 */
export function initDigitalData(
  pathname: string,
  overrides: Partial<DigitalData> = {}
): void {
  if (typeof window === "undefined") return; // SSR guard

  const { pageName, pageSection } = derivePageInfo(pathname);

  // Preserve any user data already stored (e.g. set by login flow)
  const existing = window.digitalData ?? {};

  window.digitalData = {
    pageName,
    pageUrl: window.location.href,
    pageSection,
    language:
      document.documentElement.lang ||
      navigator.language?.split("-")[0] ||
      "en",
    userName: existing.userName || "anonymous",
    userEmail: existing.userEmail || "",
    userImage: existing.userImage || "",
    // Caller overrides win (e.g. passing userName after successful login)
    ...overrides,
  };
}

/**
 * Merge partial updates into the existing window.digitalData object.
 * Use this after login/logout to update user fields without wiping page data.
 *
 * @example
 * updateDigitalData({ userName: "Jane Doe", userEmail: "jane@example.com" });
 */
export function updateDigitalData(fields: Partial<DigitalData>): void {
  if (typeof window === "undefined") return;
  window.digitalData = { ...(window.digitalData ?? {}), ...fields };
}
