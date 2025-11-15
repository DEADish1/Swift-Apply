import { createClient } from "@/lib/supabase/server";
import { calculateMatchScore, generateResumeSuggestions } from "@/utils/job-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get job posting
  const { data: job } = await supabase
    .from("job_posts")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  // Get user's profile and skills
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const { data: skills } = await supabase
    .from("skills")
    .select("name")
    .eq("profile_id", profile.id);

  const { data: experiences } = await supabase
    .from("experiences")
    .select("bullet_points")
    .eq("profile_id", profile.id);

  // Calculate match score
  const userSkills = skills?.map((s) => s.name) || [];
  const experienceKeywords = experiences?.flatMap((e) => e.bullet_points || []) || [];

  const { score, matching, missing } = calculateMatchScore(
    userSkills,
    experienceKeywords,
    job.keywords
  );

  const suggestions = generateResumeSuggestions(missing, experienceKeywords);

  // Save match result
  const body = await request.json().catch(() => ({}));
  const resumeProfileId = body.resume_profile_id;

  if (resumeProfileId) {
    await supabase.from("job_matches").upsert(
      {
        job_post_id: id,
        resume_profile_id: resumeProfileId,
        match_score: score,
        matched_keywords: matching,
        missing_keywords: missing,
        analysis_summary: `Match score: ${score}%. You have ${matching.length} matching keywords and are missing ${missing.length} keywords.`,
      },
      {
        onConflict: "job_post_id,resume_profile_id",
      }
    );
  }

  return NextResponse.json({
    match_score: score,
    matched_keywords: matching,
    missing_keywords: missing,
    suggestions,
  });
}
