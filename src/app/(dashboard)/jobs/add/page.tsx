"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { extractKeywords, calculateMatchScore, generateResumeSuggestions } from "@/utils/job-matcher";
import { ArrowLeft, CheckCircle, Sparkles, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddJobPage() {
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    is_remote: false,
    salary_min: "",
    salary_max: "",
    description: "",
    source_url: "",
  });

  const [analysis, setAnalysis] = useState<{
    keywords: string[];
    matchScore: number;
    matching: string[];
    missing: string[];
    suggestions: string[];
  } | null>(null);

  const router = useRouter();

  const handleAnalyze = () => {
    setLoading(true);

    // Extract keywords from job description
    const keywords = extractKeywords(formData.description);

    // Mock user skills for demo (in production, fetch from database)
    const userSkills = ["Customer Service", "Cash Handling", "Communication", "Teamwork"];
    const userKeywords = ["retail", "fast-paced", "customer"];

    // Calculate match
    const { score, matching, missing } = calculateMatchScore(userSkills, userKeywords, keywords);

    // Generate suggestions
    const suggestions = generateResumeSuggestions(missing, []);

    setAnalysis({
      keywords,
      matchScore: score,
      matching,
      missing,
      suggestions,
    });

    setAnalyzed(true);
    setLoading(false);
  };

  const handleSave = () => {
    // In production, save to Supabase
    console.log("Saving job:", formData);
    router.push("/jobs");
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/jobs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add Job Posting</h1>
            <p className="mt-1 text-gray-600">Save a job to analyze and track your application</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Job Details</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Job Title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Cashier, Delivery Driver"
                required
              />
              <Input
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                placeholder="Company name"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="City, State"
                required
              />
              <div className="flex items-end">
                <Checkbox
                  label="This is a remote position"
                  checked={formData.is_remote}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, is_remote: e.target.checked }))
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Minimum Salary (optional)"
                type="number"
                value={formData.salary_min}
                onChange={(e) => setFormData((prev) => ({ ...prev, salary_min: e.target.value }))}
                placeholder="e.g., 35000"
              />
              <Input
                label="Maximum Salary (optional)"
                type="number"
                value={formData.salary_max}
                onChange={(e) => setFormData((prev) => ({ ...prev, salary_max: e.target.value }))}
                placeholder="e.g., 45000"
              />
            </div>

            <Input
              label="Job Posting URL (optional)"
              value={formData.source_url}
              onChange={(e) => setFormData((prev) => ({ ...prev, source_url: e.target.value }))}
              placeholder="https://..."
            />

            <Textarea
              label="Job Description"
              value={formData.description}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, description: e.target.value }));
                setAnalyzed(false);
              }}
              placeholder="Paste the full job description here..."
              rows={10}
              required
            />

            <div className="flex gap-2">
              <Button
                onClick={handleAnalyze}
                disabled={!formData.description.trim() || loading}
                variant="secondary"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {loading ? "Analyzing..." : "Analyze Job Match"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {analyzed && analysis && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Job Analysis</h2>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{analysis.matchScore}%</div>
                  <div className="text-sm text-gray-500">Match Score</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 font-medium text-gray-900">Extracted Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.slice(0, 15).map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 flex items-center font-medium text-green-700">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Skills You Have ({analysis.matching.length})
                  </h3>
                  <ul className="space-y-1">
                    {analysis.matching.slice(0, 8).map((skill) => (
                      <li key={skill} className="text-sm text-green-600">
                        ✓ {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 flex items-center font-medium text-red-700">
                    <XCircle className="mr-2 h-5 w-5" />
                    Skills to Consider ({analysis.missing.length})
                  </h3>
                  <ul className="space-y-1">
                    {analysis.missing.slice(0, 8).map((skill) => (
                      <li key={skill} className="text-sm text-red-600">
                        ✗ {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {analysis.suggestions.length > 0 && (
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-medium text-blue-900">Resume Suggestions</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-blue-700">
                    {analysis.suggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end gap-2">
          <Link href="/jobs">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button
            onClick={handleSave}
            disabled={!formData.title || !formData.company || !formData.location || !formData.description}
          >
            Save Job Posting
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
