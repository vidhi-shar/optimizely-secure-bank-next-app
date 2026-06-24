"use client";

import { useEffect } from "react";

export default function ProductVisitTracker({
  product,
}: {
  product: "credit-cards" | "loans";
}) {  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/credit-cards') {
        document.cookie =
          "sb_visited_product=credit-cards; path=/; max-age=2592000";
      } else if (path === '/loans') {
        document.cookie =
          "sb_visited_product=loans; path=/; max-age=2592000";
      }
    }
  }, []);

  return null;
}
