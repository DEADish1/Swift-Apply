import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase, ClipboardList, FileText, Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // In production, fetch actual data from Supabase
  const stats = {
    resumes: 0,
    jobsSaved: 0,
    applications: 0,
    interviews: 0,
  };

  return (
    <DashboardLayout userName="User">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">Welcome to your job search command center</p>
        </div>

        {/* Quick stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Resumes</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.resumes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Jobs Saved</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.jobsSaved}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <ClipboardList className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Applications</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.applications}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                  <ClipboardList className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Interviews</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.interviews}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/resume/new">
              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="flex items-center p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <Plus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Create Resume</p>
                    <p className="text-sm text-gray-500">Build a new ATS-friendly resume</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/jobs/add">
              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="flex items-center p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <Plus className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Add Job Posting</p>
                    <p className="text-sm text-gray-500">Save a job to analyze and track</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/profile/experience">
              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="flex items-center p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <Plus className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Add Experience</p>
                    <p className="text-sm text-gray-500">Update your work history</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Getting started guide */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Getting Started</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                  1
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Add your work experience</p>
                  <p className="text-sm text-gray-500">
                    Tell us about your jobs, even if they seem unrelated to what you want next
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                  2
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Add your skills</p>
                  <p className="text-sm text-gray-500">
                    Include both technical skills and soft skills like customer service
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                  3
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Generate your resume</p>
                  <p className="text-sm text-gray-500">
                    We&apos;ll turn your experience into strong, professional bullet points
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                  4
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Save job postings</p>
                  <p className="text-sm text-gray-500">
                    Add jobs you&apos;re interested in and see how well you match
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
