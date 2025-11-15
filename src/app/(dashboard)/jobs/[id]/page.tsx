"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import {
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  MapPin,
  Sparkles,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;

  // Mock job data - in production, fetch from API
  const [job] = useState({
    id: jobId,
    title: "Customer Service Representative",
    company: "TechCorp Inc.",
    location: "Austin, TX",
    is_remote: false,
    salary_min: 35000,
    salary_max: 45000,
    description: `We are looking for a friendly and motivated Customer Service Representative to join our team.

Key Responsibilities:
- Handle inbound customer inquiries via phone, email, and chat
- Resolve customer complaints and issues in a timely manner
- Process orders and returns accurately
- Maintain detailed records of customer interactions
- Collaborate with team members to improve service quality

Requirements:
- High school diploma or equivalent
- 1+ years of customer service experience
- Excellent communication skills
- Proficiency in Microsoft Office
- Ability to work in a fast-paced environment
- Strong problem-solving skills`,
    keywords: [
      "customer service",
      "communication",
      "microsoft office",
      "problem solving",
      "team collaboration",
      "data entry",
      "phone support",
    ],
    source_url: "https://example.com/job/123",
    created_at: "2024-01-10T10:00:00Z",
  });

  const [matchData] = useState({
    score: 78,
    matching: ["customer service", "communication", "microsoft office", "team collaboration"],
    missing: ["phone support", "data entry", "problem solving"],
  });

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { text: "Strong Match", variant: "success" as const };
    if (score >= 60) return { text: "Good Match", variant: "warning" as const };
    return { text: "Stretch", variant: "danger" as const };
  };

  const scoreLabel = getScoreLabel(matchData.score);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/jobs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
        </div>

        {/* Job Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                <p className="mt-1 text-lg text-gray-600">{job.company}</p>
                <div className="mt-3 flex items-center gap-4 text-gray-500">
                  <span className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {job.location}
                  </span>
                  {job.is_remote && <Badge variant="success">Remote</Badge>}
                  {job.salary_min && job.salary_max && (
                    <span>
                      ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              {job.source_url && (
                <a
                  href={job.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-500"
                >
                  <ExternalLink className="mr-1 h-4 w-4" />
                  View Original
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Match Score */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Match Score</h2>
              <Badge variant={scoreLabel.variant} size="md">
                {scoreLabel.text}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <div className="text-5xl font-bold text-blue-600">{matchData.score}%</div>
              <p className="mt-2 text-gray-500">based on your skills and experience</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 flex items-center font-medium text-green-700">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Skills You Have ({matchData.matching.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {matchData.matching.map((skill) => (
                    <Tag key={skill} variant="success">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 flex items-center font-medium text-red-700">
                  <XCircle className="mr-2 h-5 w-5" />
                  Skills to Consider ({matchData.missing.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {matchData.missing.map((skill) => (
                    <Tag key={skill} variant="danger">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Job Description</h2>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-gray-700">{job.description}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Keywords */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Extracted Keywords</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {job.keywords.map((keyword) => (
                <Tag key={keyword} variant="primary">
                  {keyword}
                </Tag>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Resume Options</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Generate a tailored resume specifically for this job posting
            </p>
            <div className="flex gap-3">
              <Button>
                <Sparkles className="mr-2 h-4 w-4" />
                Tailor Resume for This Job
              </Button>
              <Button variant="outline">Mark as Applied</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
