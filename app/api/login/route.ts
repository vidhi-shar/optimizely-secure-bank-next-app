import { NextRequest, NextResponse } from "next/server";
import { findUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = findUser(email, password);

  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  // Return name AND email so the login page can push both into the data layer.
  // Email is safe to expose here — the client already knows it (they typed it).
  const res = NextResponse.json({ success: true, name: user.name, email: user.email });

  // httpOnly session — secure, not readable by JS
  res.cookies.set("sb_session", JSON.stringify({ id: user.id, name: user.name, email: user.email }), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8,
    sameSite: "lax",
  });

  // JS-readable display cookie — holds name for the nav header
  res.cookies.set("sb_user", user.name, {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 8,
    sameSite: "lax",
  });

  // JS-readable email cookie — holds email for the data layer.
  // Not sensitive: the user typed this email moments ago.
  res.cookies.set("sb_email", user.email, {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 8,
    sameSite: "lax",
  });

  return res;
}
