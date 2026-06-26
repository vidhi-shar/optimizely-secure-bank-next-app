"use client";
/**
 * components/AdobeDataLayerProvider.tsx
 *
 * Ports the AEM inline <script> block to a Next.js Client Component.
 *
 * FIX: Reads userName and userEmail from localStorage (not cookies) because
 * Next.js production route transitions cause cookies to be temporarily
 * unreadable in useEffect, writing "anonymous" into digitalData even when the
 * user is logged in. localStorage is always reliably readable in the browser.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initDigitalData } from "@/lib/adobeDataLayer";

const LAUNCH_SCRIPT_URL =
  process.env.NEXT_PUBLIC_ADOBE_LAUNCH_URL ||
  "https://assets.adobedtm.com/8b93b0a558ea/8fe582a1f8d4/launch-2d344683019e-development.min.js";

export default function AdobeDataLayerProvider() {
  const pathname = usePathname();
  const launchInjected = useRef(false);

  // Inject Adobe Launch script once on first mount
  useEffect(() => {
    if (launchInjected.current) return;
    const script = document.createElement("script");
    script.src = LAUNCH_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);
    launchInjected.current = true;
  }, []);

  // Populate window.digitalData on every route change
  // FIX: Read from localStorage — always reliable in production builds.
  // Cookies are unreliable here due to Next.js production route transition timing.
  useEffect(() => {
    const userName  = localStorage.getItem("sb_user")  || "anonymous";
    const userEmail = localStorage.getItem("sb_email") || "";

    initDigitalData(pathname, { userName, userEmail, userImage: "" });

    const satellite = (window as Window & { _satellite?: { track: (s: string) => void } })._satellite;
    if (typeof satellite?.track === "function") {
      satellite.track("page:loaded");
    }
  }, [pathname]);

  return null;
}
