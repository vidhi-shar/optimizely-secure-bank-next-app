import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"));
  res.cookies.delete("sb_session");
  res.cookies.delete("sb_user");
  // Clear the email cookie so digitalData.userEmail resets to "" on logout
  res.cookies.delete("sb_email");
  return res;
}
