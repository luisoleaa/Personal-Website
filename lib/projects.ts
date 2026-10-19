import supabase from "@/lib/supabase-client";
import type { Project } from "@/components/portfolio/types";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("Projects")
    .select("id, name, date, description, image, link, skills, category, emblem")
    .order("id", { ascending: true });

  if (error) {
    console.error("[getProjects] Supabase error:", error);
    return [];
  }

  return data ?? [];
}
