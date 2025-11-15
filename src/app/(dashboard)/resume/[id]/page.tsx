"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tag } from "@/components/ui/tag";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Edit2, Save, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ResumeDetailPage() {
  const params = useParams();
  const resumeId = params.id as string;

  const [isEditing, setIsEditing] = useState(false);

  // Mock resume data - in production, fetch from API
  const [resume, setResume] = useState({
    id: resumeId,
    name: "Customer Service Resume",
    headline: "Dedicated Customer Service Professional",
    summary:
      "Motivated customer service professional with 3+ years of experience in retail and hospitality. Known for resolving customer issues efficiently and maintaining high satisfaction scores.",
    contact: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      location: "Austin, TX",
    },
    experiences: [
      {
        id: "1",
        title: "Retail Associate",
        company: "Target",
        location: "Austin, TX",
        startDate: "2022-06",
        endDate: "Present",
        bullets: [
          "Assisted 50+ customers daily with product selection and checkout",
          "Maintained inventory accuracy of 98% through regular stock checks",
          "Trained 5 new team members on POS systems and store procedures",
          "Resolved customer complaints, achieving 95% satisfaction rating",
        ],
      },
      {
        id: "2",
        title: "Server",
        company: "Applebee's",
        location: "Austin, TX",
        startDate: "2020-03",
        endDate: "2022-05",
        bullets: [
          "Served 20+ tables per shift in fast-paced restaurant environment",
          "Processed $2,000+ in daily transactions accurately",
          "Maintained food safety standards and earned ServSafe certification",
        ],
      },
    ],
    skills: [
      "Customer Service",
      "Cash Handling",
      "POS Systems",
      "Inventory Management",
      "Team Collaboration",
      "Problem Solving",
      "Microsoft Office",
      "Communication",
    ],
    is_master: true,
    updated_at: "2024-01-15T10:00:00Z",
  });

  const [editForm, setEditForm] = useState({
    headline: resume.headline,
    summary: resume.summary,
  });

  const handleSave = () => {
    setResume((prev) => ({
      ...prev,
      headline: editForm.headline,
      summary: editForm.summary,
    }));
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    if (dateString === "Present") return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/resume">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">{resume.name}</h1>
                {resume.is_master && <Badge variant="primary">Master</Badge>}
              </div>
              <p className="text-sm text-gray-500">
                Last updated: {new Date(resume.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Resume Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                {/* Header */}
                <div className="border-b pb-4 text-center">
                  <h2 className="text-3xl font-bold text-gray-900">{resume.contact.name}</h2>
                  <p className="mt-2 text-gray-600">
                    {resume.contact.email} • {resume.contact.phone} • {resume.contact.location}
                  </p>
                </div>

                {/* Headline & Summary */}
                <div className="mt-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        label="Headline"
                        value={editForm.headline}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, headline: e.target.value }))
                        }
                      />
                      <Textarea
                        label="Summary"
                        value={editForm.summary}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, summary: e.target.value }))
                        }
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-blue-600">{resume.headline}</h3>
                      <p className="mt-2 text-gray-700">{resume.summary}</p>
                    </>
                  )}
                </div>

                {/* Experience */}
                <div className="mt-8">
                  <h3 className="border-b pb-2 text-lg font-semibold text-gray-900">
                    Professional Experience
                  </h3>
                  <div className="mt-4 space-y-6">
                    {resume.experiences.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                            <p className="text-gray-600">{exp.company}</p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <div>
                              {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                            </div>
                            <div>{exp.location}</div>
                          </div>
                        </div>
                        <ul className="mt-2 list-inside list-disc space-y-1">
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-sm text-gray-700">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-8">
                  <h3 className="border-b pb-2 text-lg font-semibold text-gray-900">Skills</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {resume.skills.map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
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
                <h3 className="font-semibold">Quick Stats</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experiences</span>
                  <span className="font-medium">{resume.experiences.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Skills</span>
                  <span className="font-medium">{resume.skills.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bullet Points</span>
                  <span className="font-medium">
                    {resume.experiences.reduce((acc, exp) => acc + exp.bullets.length, 0)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold">Actions</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Duplicate Resume
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Set as Master
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:bg-red-50"
                >
                  Delete Resume
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
