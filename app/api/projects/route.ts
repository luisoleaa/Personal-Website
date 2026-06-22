import { NextResponse } from "next/server";
import supabase from "@/lib/supabase-client";
export async function GET() {
  const { data: projects, error } = await supabase
    .from("Projects")
    .select("id, name, date, description, image, link, skills")
    .order("date", { ascending: false });

  if (error) {
    console.error("[/api/Projects] Supabase error:", error);
    return NextResponse.json(
      { error: "Error loading projects.", detail: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ projects });
}
