import { createClient } from "@/lib/supabase/server";
import { extractKeywords } from "@/utils/job-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: jobs, error } = await supabase
    .from("job_posts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();

  // Extract keywords from description
  const keywords = extractKeywords(body.description);

  const { data: job, error } = await supabase
    .from("job_posts")
    .insert({
      user_id: user.id,
      title: body.title,
      company: body.company,
      location: body.location,
      is_remote: body.is_remote || false,
      salary_min: body.salary_min,
      salary_max: body.salary_max,
      description: body.description,
      keywords,
      source_url: body.source_url,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(job, { status: 201 });
}
