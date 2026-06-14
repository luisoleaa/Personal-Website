import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-client";

export async function GET() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, name, date, description, image, link, skills")
    .order("date", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Error loading projects." },
      { status: 500 },
    );
  }

  return NextResponse.json({ projects });
}
