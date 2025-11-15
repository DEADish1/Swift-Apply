"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Resume } from "@/types";
import { FileText, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ResumesPage() {
  const [resumes] = useState<Resume[]>([]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
            <p className="mt-1 text-gray-600">Create and manage your resume versions</p>
          </div>
          <Link href="/resume/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Resume
            </Button>
          </Link>
        </div>

        {resumes.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No resumes yet</h3>
              <p className="mt-2 text-gray-500">
                Create your first resume to start applying for jobs
              </p>
              <Link href="/resume/new">
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Resume
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">{resume.title}</h3>
                        {resume.target_role && (
                          <p className="text-sm text-gray-500">{resume.target_role}</p>
                        )}
                      </div>
                    </div>
                    {resume.is_master && (
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                        Master
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Last updated: {formatDate(resume.updated_at)}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Link href={`/resume/${resume.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        View
                      </Button>
                    </Link>
                    <Link href={`/resume/${resume.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Edit
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
