"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function OptimizelyActivate() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).optimizely) {
      (window as any).optimizely.push({ type: "activate" });
    }
  }, [pathname]);

  return null;
}
