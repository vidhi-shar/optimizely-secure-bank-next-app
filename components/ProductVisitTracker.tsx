"use client";

import { useEffect } from "react";

export default function ProductVisitTracker({
  product,
}: {
  product: "credit-cards" | "loans";
}) {
  useEffect(() => {
    document.cookie = `sb_visited_product=${product}; path=/; max-age=2592000`;
  }, [product]);

  return null;
}
