import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // FIX: Use req.nextUrl.origin so redirect works in production on any host
  const origin = req.nextUrl.origin;
  const res = NextResponse.redirect(new URL("/", origin));
  res.cookies.delete("sb_session");
  res.cookies.delete("sb_user");
  // Note: localStorage is cleared client-side in Header.tsx handleLogout()
  return res;
}
