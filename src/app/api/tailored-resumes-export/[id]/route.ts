import { createClient } from "@/lib/supabase/server";
import { generateResumeHTML } from "@/lib/pdf";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
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

  // Get tailored resume
  const { data: tailoredResume, error } = await supabase
    .from("tailored_resumes")
    .select("*, resume_profiles!inner(*, profiles!inner(user_id))")
    .eq("id", id)
    .single();

  if (error || !tailoredResume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  if (tailoredResume.resume_profiles.profiles.user_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Generate HTML for PDF
  const content = tailoredResume.content as {
    headline?: string;
    summary?: string;
    experience?: {
      title: string;
      company: string;
      location: string;
      startDate: string;
      endDate: string;
      bullets: string[];
    }[];
    skills?: string[];
    education?: {
      school: string;
      degree?: string;
      field?: string;
      endDate?: string;
    }[];
    contact?: {
      name: string;
      email: string;
      phone: string;
      location: string;
    };
  };

  const html = generateResumeHTML({
    contact: content.contact || {
      name: "Your Name",
      email: "email@example.com",
      phone: "(555) 123-4567",
      location: "City, State",
    },
    headline: content.headline,
    summary: content.summary,
    experiences: content.experience || [],
    skills: content.skills || [],
    education: content.education,
  });

  // Return HTML that can be converted to PDF client-side
  // In production, you might use a server-side PDF generation service
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
      "Content-Disposition": `attachment; filename="${tailoredResume.title}.html"`,
    },
  });
}
