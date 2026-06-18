import { NextRequest, NextResponse } from "next/server";
import { findUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = findUser(email, password);

  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true, name: user.name });
  res.cookies.set("sb_session", JSON.stringify({ id: user.id, name: user.name, email: user.email }), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
    sameSite: "lax",
  });

  return res;
}
