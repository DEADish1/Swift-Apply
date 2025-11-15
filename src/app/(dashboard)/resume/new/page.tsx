"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateBulletPoint, suggestMetricsQuestions } from "@/utils/bullet-generator";
import { ArrowLeft, Download, Lightbulb, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ResumeSection {
  title: string;
  summary: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  experiences: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }[];
  skills: string[];
}

export default function NewResumePage() {
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeSection>({
    title: "",
    summary: "",
    contact: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
    experiences: [],
    skills: [],
  });

  const [currentBullet, setCurrentBullet] = useState("");
  const [improvementSuggestions, setImprovementSuggestions] = useState<string[]>([]);

  const handleGenerateBullet = () => {
    if (currentBullet.trim()) {
      const improved = generateBulletPoint(currentBullet, "General");
      setCurrentBullet(improved);
      setImprovementSuggestions(suggestMetricsQuestions(currentBullet));
    }
  };

  const generateSummary = () => {
    // Simple summary generation based on data
    const summary = `Motivated professional with experience in ${resumeData.skills.slice(0, 3).join(", ") || "customer service"}. Seeking opportunities to contribute strong work ethic and attention to detail.`;
    setResumeData((prev) => ({ ...prev, summary }));
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/resume">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Resume</h1>
              <p className="mt-1 text-gray-600">Build an ATS-friendly resume step by step</p>
            </div>
          </div>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  step >= s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {s}
              </div>
              {s < 4 && <div className={`h-1 w-12 ${step > s ? "bg-blue-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Basic Information</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Resume Title"
                value={resumeData.title}
                onChange={(e) => setResumeData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Customer Service Resume"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Full Name"
                  value={resumeData.contact.name}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, name: e.target.value },
                    }))
                  }
                  placeholder="Your name"
                />
                <Input
                  label="Email"
                  type="email"
                  value={resumeData.contact.email}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, email: e.target.value },
                    }))
                  }
                  placeholder="you@example.com"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Phone"
                  value={resumeData.contact.phone}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, phone: e.target.value },
                    }))
                  }
                  placeholder="(555) 123-4567"
                />
                <Input
                  label="Location"
                  value={resumeData.contact.location}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, location: e.target.value },
                    }))
                  }
                  placeholder="City, State"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setStep(2)}>Next: Summary</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Professional Summary</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Summary / Objective
                  </label>
                  <Button variant="outline" size="sm" onClick={generateSummary}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate for Me
                  </Button>
                </div>
                <Textarea
                  value={resumeData.summary}
                  onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
                  placeholder="Write a brief summary of your professional background and goals..."
                  rows={4}
                />
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <div className="flex items-start">
                  <Lightbulb className="mr-2 h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Tips for a great summary:</p>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-blue-700">
                      <li>Keep it to 2-3 sentences</li>
                      <li>Highlight your top skills and strengths</li>
                      <li>Mention what type of role you&apos;re seeking</li>
                      <li>Use keywords from job descriptions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>Next: Bullet Points</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Improve Your Bullet Points</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Enter a responsibility or achievement, and we&apos;ll help you make it stronger.
              </p>

              <div>
                <Textarea
                  label="Your bullet point"
                  value={currentBullet}
                  onChange={(e) => {
                    setCurrentBullet(e.target.value);
                    setImprovementSuggestions([]);
                  }}
                  placeholder="e.g., Helped customers find products"
                  rows={3}
                />
                <Button onClick={handleGenerateBullet} className="mt-2">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Improve This Bullet
                </Button>
              </div>

              {improvementSuggestions.length > 0 && (
                <div className="rounded-lg bg-yellow-50 p-4">
                  <p className="mb-2 font-medium text-yellow-900">
                    Add metrics to make it even stronger:
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-yellow-700">
                    {improvementSuggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="font-medium text-gray-900">Example transformations:</p>
                <div className="mt-2 space-y-2 text-sm">
                  <div>
                    <p className="text-red-600">❌ Helped customers</p>
                    <p className="text-green-600">
                      ✓ Assisted 50+ customers daily with product selection and checkout
                    </p>
                  </div>
                  <div>
                    <p className="text-red-600">❌ Responsible for cleaning</p>
                    <p className="text-green-600">
                      ✓ Maintained cleanliness standards across 2,000 sq ft retail space
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={() => setStep(4)}>Next: Preview</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Resume Preview</h2>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-white p-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold">
                    {resumeData.contact.name || "Your Name"}
                  </h1>
                  <p className="mt-1 text-gray-600">
                    {resumeData.contact.email} • {resumeData.contact.phone} •{" "}
                    {resumeData.contact.location}
                  </p>
                </div>

                {resumeData.summary && (
                  <div className="mt-6">
                    <h2 className="border-b pb-1 text-lg font-semibold">Professional Summary</h2>
                    <p className="mt-2 text-gray-700">{resumeData.summary}</p>
                  </div>
                )}

                <div className="mt-6">
                  <h2 className="border-b pb-1 text-lg font-semibold">Experience</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Add your work experience from the Profile section to see it here.
                  </p>
                </div>

                <div className="mt-6">
                  <h2 className="border-b pb-1 text-lg font-semibold">Skills</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Add skills from the Profile section to see them here.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export PDF
                  </Button>
                  <Button>Save Resume</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
