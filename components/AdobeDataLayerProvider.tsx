"use client";
/**
 * components/AdobeDataLayerProvider.tsx
 *
 * Ports the AEM inline <script> block to a Next.js Client Component.
 *
 * AEM original (two things it did):
 *  1. <script src="https://assets.adobedtm.com/.../launch-2d344683019e-development.min.js" async>
 *  2. Inline <script> that parsed /content/securebank/us/en/... and set window.digitalData
 *
 * Next.js equivalent (this file):
 *  1. Appends the same Launch <script> tag to <head> once on first mount.
 *  2. Populates window.digitalData on every client-side route change,
 *     deriving pageName / pageSection from the Next.js pathname instead of
 *     the AEM content path (there is no /content/securebank/us/en/ prefix here).
 *  3. Reads sb_user (name) and sb_email (email) cookies to keep user fields
 *     in sync with login state across all route changes.
 *
 * Rendered inside <body> in app/layout.tsx — outputs nothing visible.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initDigitalData, updateDigitalData } from "@/lib/adobeDataLayer";

// Adobe Launch script URL — same URL as the AEM site.
// Stored in an env variable so staging vs production can be swapped without
// a code change. Falls back to the development URL if the variable is not set.
const LAUNCH_SCRIPT_URL =
  process.env.NEXT_PUBLIC_ADOBE_LAUNCH_URL ||
  "https://assets.adobedtm.com/8b93b0a558ea/8fe582a1f8d4/launch-2d344683019e-development.min.js";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export default function AdobeDataLayerProvider() {
  const pathname = usePathname();
  const launchInjected = useRef(false);

  // ── 1. Inject the Adobe Launch <script> tag once ────────────────────────
  // Equivalent to the AEM:
  //   <script src="https://assets.adobedtm.com/.../launch-....min.js" async></script>
  useEffect(() => {
    if (launchInjected.current) return;

    const script = document.createElement("script");
    script.src = LAUNCH_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    launchInjected.current = true;
  }, []);

  // ── 2. Populate window.digitalData on every route change ─────────────────
  // Equivalent to the AEM inline <script> block that set:
  //   window.digitalData = { pageName, pageUrl, pageSection, language,
  //                           userName, userEmail, userImage }
  //
  // sb_user  cookie → userName  (set by /api/login, cleared by /api/logout)
  // sb_email cookie → userEmail (set by /api/login, cleared by /api/logout)
  //
  // On the login page itself, updateDigitalData() in login/page.tsx fires
  // immediately after the API responds — before the router.push — so the
  // dashboard page:loaded event already has the correct email.
  useEffect(() => {
    const userName = getCookie("sb_user") || "anonymous";
    const userEmail = getCookie("sb_email") || "";

    initDigitalData(pathname, {
      userName,
      userEmail,
      userImage: "",
    });

    // Notify Launch that page data is ready.
    // Remove if your Launch property uses its own Page Bottom event.
    const satellite = (window as Window & { _satellite?: { track: (s: string) => void } })._satellite;
    if (typeof satellite?.track === "function") {
      satellite.track("page:loaded");
    }
  }, [pathname]);

  // Renders nothing — purely a side-effect provider.
  return null;
}
