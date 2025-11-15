"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JobPosting } from "@/types";
import { Briefcase, ExternalLink, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function JobsPage() {
  const [jobs] = useState<JobPosting[]>([]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
            <p className="mt-1 text-gray-600">Track jobs you&apos;re interested in</p>
          </div>
          <Link href="/jobs/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Job Posting
            </Button>
          </Link>
        </div>

        {jobs.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs saved yet</h3>
              <p className="mt-2 text-gray-500">
                Add job postings to see how well you match and track your applications
              </p>
              <Link href="/jobs/add">
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Job
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                      <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {job.location}
                        </span>
                        {job.is_remote && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                            Remote
                          </span>
                        )}
                        {job.salary_min && job.salary_max && (
                          <span>
                            ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">85%</div>
                      <div className="text-sm text-gray-500">Match</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.keywords.slice(0, 5).map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                      >
                        {keyword}
                      </span>
                    ))}
                    {job.keywords.length > 5 && (
                      <span className="text-xs text-gray-500">
                        +{job.keywords.length - 5} more
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Added {formatDate(job.created_at)}</span>
                    <div className="flex gap-2">
                      {job.source_url && (
                        <a
                          href={job.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                        >
                          <ExternalLink className="mr-1 h-4 w-4" />
                          View Original
                        </a>
                      )}
                      <Link href={`/jobs/${job.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button size="sm">Apply</Button>
                    </div>
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
