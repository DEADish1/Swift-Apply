import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: applications, error } = await supabase
    .from("applications")
    .select(
      `
      *,
      job_posts (
        id,
        title,
        company,
        location,
        is_remote,
        salary_min,
        salary_max
      ),
      tailored_resumes (
        id,
        title
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(applications);
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

  const { data: application, error } = await supabase
    .from("applications")
    .insert({
      user_id: user.id,
      job_post_id: body.job_post_id,
      tailored_resume_id: body.tailored_resume_id,
      date_applied: body.date_applied,
      status: body.status || "saved",
      notes: body.notes,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(application, { status: 201 });
}
