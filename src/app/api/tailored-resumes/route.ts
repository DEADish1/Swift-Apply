import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const jobPostId = searchParams.get("job_post_id");
  const resumeProfileId = searchParams.get("resume_profile_id");

  let query = supabase
    .from("tailored_resumes")
    .select("*, job_posts(*), resume_profiles(*)")
    .order("created_at", { ascending: false });

  if (jobPostId) {
    query = query.eq("job_post_id", jobPostId);
  }

  if (resumeProfileId) {
    query = query.eq("resume_profile_id", resumeProfileId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
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
  const { job_post_id, resume_profile_id, custom_summary, custom_skills, highlighted_experiences } = body;

  if (!job_post_id || !resume_profile_id) {
    return NextResponse.json(
      { error: "job_post_id and resume_profile_id are required" },
      { status: 400 }
    );
  }

  // Verify job post exists and belongs to user
  const { data: jobPost } = await supabase
    .from("job_posts")
    .select("id, title, company, keywords")
    .eq("id", job_post_id)
    .single();

  if (!jobPost) {
    return NextResponse.json({ error: "Job post not found" }, { status: 404 });
  }

  // Verify resume profile exists and belongs to user
  const { data: resumeProfile } = await supabase
    .from("resume_profiles")
    .select("*")
    .eq("id", resume_profile_id)
    .single();

  if (!resumeProfile) {
    return NextResponse.json({ error: "Resume profile not found" }, { status: 404 });
  }

  // Create tailored resume
  const tailoredResumeData = {
    job_post_id,
    resume_profile_id,
    custom_summary: custom_summary || resumeProfile.summary || "",
    custom_skills: custom_skills || resumeProfile.skills || [],
    highlighted_experiences: highlighted_experiences || [],
  };

  const { data: tailoredResume, error } = await supabase
    .from("tailored_resumes")
    .insert(tailoredResumeData)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(tailoredResume, { status: 201 });
}
