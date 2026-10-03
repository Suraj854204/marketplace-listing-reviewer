import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  // In static export mode, auth callbacks are handled client-side.
  // This route exists as a placeholder to prevent build errors.
  return NextResponse.json({ error: "Auth callback requires server mode" }, { status: 400 });
}
