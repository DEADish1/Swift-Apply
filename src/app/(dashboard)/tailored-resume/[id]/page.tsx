"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, Download, Edit2, Save } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function TailoredResumePage() {
  const params = useParams();
  const resumeId = params.id as string;

  // Mock tailored resume data
  const [resume, setResume] = useState({
    id: resumeId,
    title: "Tailored for Customer Service Rep at TechCorp",
    job: {
      title: "Customer Service Representative",
      company: "TechCorp Inc.",
      location: "Austin, TX",
    },
    content: {
      headline: "Results-Driven Customer Service Professional",
      summary:
        "Customer service professional with 3+ years of experience in fast-paced retail environments. Proven track record of maintaining 95%+ customer satisfaction ratings and efficiently resolving inquiries via phone, email, and in-person interactions. Skilled in POS systems, data entry, and team collaboration.",
      experiences: [
        {
          title: "Retail Associate",
          company: "Target",
          location: "Austin, TX",
          startDate: "Jun 2022",
          endDate: "Present",
          bullets: [
            "Deliver exceptional customer service to 50+ customers daily, resolving inquiries and complaints with 95% satisfaction rating",
            "Process transactions accurately using POS systems, handling $1,500+ in daily sales",
            "Collaborate with 10-person team to maintain inventory accuracy and store cleanliness standards",
            "Train new team members on customer service best practices and store procedures",
          ],
        },
        {
          title: "Server",
          company: "Applebee's",
          location: "Austin, TX",
          startDate: "Mar 2020",
          endDate: "May 2022",
          bullets: [
            "Provided friendly, efficient service to customers in high-volume restaurant environment",
            "Managed customer complaints and special requests, ensuring positive dining experience",
            "Processed payments and maintained accurate cash handling records",
          ],
        },
      ],
      skills: [
        "Customer Service",
        "Communication",
        "POS Systems",
        "Problem Solving",
        "Microsoft Office",
        "Data Entry",
        "Team Collaboration",
        "Phone Support",
      ],
    },
    match_score: 85,
    created_at: "2024-01-15T10:00:00Z",
  });

  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [editedSummary, setEditedSummary] = useState(resume.content.summary);

  const handleSaveSummary = () => {
    setResume((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        summary: editedSummary,
      },
    }));
    setIsEditingSummary(false);
  };

  const handleExportPDF = () => {
    // In production, this would call the API endpoint
    // For now, show an alert
    alert("PDF export functionality - In production, this would generate and download a PDF");
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/jobs/${resume.job.title}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Job
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{resume.title}</h1>
              <p className="text-sm text-gray-500">
                Created: {new Date(resume.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportPDF}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Used
            </Button>
          </div>
        </div>

        {/* Job Info Banner */}
        <Card className="bg-blue-50">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-blue-900">Tailored for:</p>
              <p className="text-blue-700">
                {resume.job.title} at {resume.job.company}
              </p>
            </div>
            <Badge variant="success" size="md">
              {resume.match_score}% Match
            </Badge>
          </CardContent>
        </Card>

        {/* Resume Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                {/* Headline */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-blue-600">{resume.content.headline}</h2>
                </div>

                {/* Summary */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Professional Summary</h3>
                    {!isEditingSummary && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingSummary(true)}
                      >
                        <Edit2 className="mr-2 h-3 w-3" />
                        Edit
                      </Button>
                    )}
                  </div>
                  {isEditingSummary ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editedSummary}
                        onChange={(e) => setEditedSummary(e.target.value)}
                        rows={5}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveSummary}>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditedSummary(resume.content.summary);
                            setIsEditingSummary(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700">{resume.content.summary}</p>
                  )}
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h3 className="mb-4 border-b pb-2 font-semibold text-gray-900">
                    Professional Experience
                  </h3>
                  <div className="space-y-6">
                    {resume.content.experiences.map((exp, idx) => (
                      <div key={idx}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                            <p className="text-gray-600">{exp.company}</p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <div>
                              {exp.startDate} - {exp.endDate}
                            </div>
                            <div>{exp.location}</div>
                          </div>
                        </div>
                        <ul className="mt-2 list-inside list-disc space-y-1">
                          {exp.bullets.map((bullet, bulletIdx) => (
                            <li key={bulletIdx} className="text-sm text-gray-700">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="mb-3 border-b pb-2 font-semibold text-gray-900">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.content.skills.map((skill) => (
                      <Tag key={skill} variant="primary">
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Tailoring Notes</h3>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="rounded-lg bg-green-50 p-3">
                  <p className="font-medium text-green-800">What was optimized:</p>
                  <ul className="mt-1 list-inside list-disc text-green-700">
                    <li>Headline emphasizes results</li>
                    <li>Summary includes job keywords</li>
                    <li>Skills reordered by relevance</li>
                    <li>Bullet points highlight matching experience</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold">Keyword Coverage</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Customer Service</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Communication</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Problem Solving</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Microsoft Office</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phone Support</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
