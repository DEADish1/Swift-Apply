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

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(profile);
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();

  const { data: profile, error } = await supabase
    .from("profiles")
    .update({
      full_name: body.full_name,
      city: body.city,
      state: body.state,
      zip_code: body.zip_code,
      preferred_radius_miles: body.preferred_radius_miles,
      remote_ok: body.remote_ok,
      target_titles: body.target_titles,
      salary_min: body.salary_min,
      salary_max: body.salary_max,
      schedule_preferences: body.schedule_preferences,
      employment_types: body.employment_types,
      onboarding_completed: body.onboarding_completed,
    })
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(profile);
}
