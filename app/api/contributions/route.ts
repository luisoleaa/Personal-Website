import { NextResponse } from "next/server";
import { getContributionDays } from "@/lib/contributions";

export async function GET() {
  try {
    const days = await getContributionDays();
    return NextResponse.json({ days });
  } catch (error) {
    console.error("[/api/contributions]", error);
    return NextResponse.json(
      { error: "Unable to load contribution data." },
      { status: 502 },
    );
  }
}
