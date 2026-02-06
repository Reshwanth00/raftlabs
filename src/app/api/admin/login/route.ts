import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  // hardcoded admin creds (simple on purpose)
  if (email !== "admin@delivery.com" || password !== "admin123") {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });

  // simple cookie flag
  res.cookies.set("admin", "true", {
    httpOnly: true,
    path: "/",
  });

  return res;
}
