"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ApplicationStatus, ApplicationWithDetails } from "@/types";
import { Calendar, ClipboardList, Edit2, MapPin, Save } from "lucide-react";
import { useState } from "react";

const statusColors: Record<ApplicationStatus, string> = {
  saved: "bg-gray-100 text-gray-700",
  applied: "bg-blue-100 text-blue-700",
  interviewing: "bg-yellow-100 text-yellow-700",
  offered: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  ghosted: "bg-purple-100 text-purple-700",
  withdrawn: "bg-gray-100 text-gray-500",
};

const statusLabels: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  interviewing: "Interviewing",
  offered: "Offered",
  rejected: "Rejected",
  ghosted: "Ghosted",
  withdrawn: "Withdrawn",
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationWithDetails[]>([
    // Demo data
    {
      id: "1",
      user_id: "user-1",
      job_posting_id: "job-1",
      status: "applied",
      applied_date: "2024-01-15",
      notes: "Applied through company website. Customized resume for customer service role.",
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z",
      job_posting: {
        id: "job-1",
        user_id: "user-1",
        title: "Customer Service Representative",
        company: "TechCorp Inc.",
        location: "Austin, TX",
        is_remote: false,
        description: "Looking for a friendly customer service rep...",
        requirements: [],
        keywords: ["customer service", "communication"],
        created_at: "2024-01-10T10:00:00Z",
        updated_at: "2024-01-10T10:00:00Z",
      },
    },
    {
      id: "2",
      user_id: "user-1",
      job_posting_id: "job-2",
      status: "interviewing",
      applied_date: "2024-01-10",
      notes: "Phone screen scheduled for Jan 20th at 2pm",
      created_at: "2024-01-10T10:00:00Z",
      updated_at: "2024-01-18T10:00:00Z",
      job_posting: {
        id: "job-2",
        user_id: "user-1",
        title: "Retail Associate",
        company: "Best Buy",
        location: "Austin, TX",
        is_remote: false,
        description: "Join our retail team...",
        requirements: [],
        keywords: ["retail", "sales", "customer service"],
        created_at: "2024-01-08T10:00:00Z",
        updated_at: "2024-01-08T10:00:00Z",
      },
    },
    {
      id: "3",
      user_id: "user-1",
      job_posting_id: "job-3",
      status: "saved",
      notes: "",
      created_at: "2024-01-18T10:00:00Z",
      updated_at: "2024-01-18T10:00:00Z",
      job_posting: {
        id: "job-3",
        user_id: "user-1",
        title: "Delivery Driver",
        company: "DoorDash",
        location: "Austin, TX",
        is_remote: false,
        description: "Flexible delivery driver position...",
        requirements: [],
        keywords: ["driving", "delivery", "flexible"],
        created_at: "2024-01-17T10:00:00Z",
        updated_at: "2024-01-17T10:00:00Z",
      },
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState("");

  const groupedByStatus = applications.reduce(
    (acc, app) => {
      if (!acc[app.status]) {
        acc[app.status] = [];
      }
      acc[app.status].push(app);
      return acc;
    },
    {} as Record<ApplicationStatus, ApplicationWithDetails[]>
  );

  const updateStatus = (id: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: newStatus,
              applied_date:
                newStatus === "applied" && !app.applied_date
                  ? new Date().toISOString().split("T")[0]
                  : app.applied_date,
              updated_at: new Date().toISOString(),
            }
          : app
      )
    );
  };

  const saveNotes = (id: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, notes: editNotes, updated_at: new Date().toISOString() }
          : app
      )
    );
    setEditingId(null);
  };

  const startEditing = (app: ApplicationWithDetails) => {
    setEditingId(app.id);
    setEditNotes(app.notes || "");
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusOrder: ApplicationStatus[] = [
    "saved",
    "applied",
    "interviewing",
    "offered",
    "rejected",
    "ghosted",
    "withdrawn",
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Application Tracker</h1>
          <p className="mt-1 text-gray-600">Track your job applications and their progress</p>
        </div>

        {/* Stats overview */}
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {statusOrder.map((status) => (
            <Card key={status}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {groupedByStatus[status]?.length || 0}
                </div>
                <div className="text-sm text-gray-500">{statusLabels[status]}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {applications.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No applications yet</h3>
              <p className="mt-2 text-gray-500">
                Start tracking your job applications to stay organized
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <Card key={app.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {app.job_posting.title}
                        </h3>
                        <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusColors[app.status]}`}>
                          {statusLabels[app.status]}
                        </span>
                      </div>
                      <p className="text-gray-600">{app.job_posting.company}</p>
                      <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {app.job_posting.location}
                        </span>
                        {app.applied_date && (
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            Applied: {formatDate(app.applied_date)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="ml-4">
                      <Select
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value as ApplicationStatus)}
                        options={statusOrder.map((s) => ({
                          value: s,
                          label: statusLabels[s],
                        }))}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    {editingId === app.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Add notes about this application..."
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => saveNotes(app.id)}>
                            <Save className="mr-2 h-4 w-4" />
                            Save Notes
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {app.notes ? (
                          <div className="rounded-lg bg-gray-50 p-3">
                            <p className="text-sm text-gray-700">{app.notes}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 italic">No notes added</p>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2"
                          onClick={() => startEditing(app)}
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          {app.notes ? "Edit" : "Add"} Notes
                        </Button>
                      </div>
                    )}
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
