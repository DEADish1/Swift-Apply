"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WorkExperience } from "@/types";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

interface ExperienceFormData {
  job_title: string;
  company_name: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
  responsibilities: string[];
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [responsibilityInput, setResponsibilityInput] = useState("");

  const [formData, setFormData] = useState<ExperienceFormData>({
    job_title: "",
    company_name: "",
    location: "",
    start_date: "",
    end_date: "",
    is_current: false,
    description: "",
    responsibilities: [],
  });

  const resetForm = () => {
    setFormData({
      job_title: "",
      company_name: "",
      location: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
      responsibilities: [],
    });
    setResponsibilityInput("");
    setShowForm(false);
    setEditingId(null);
  };

  const addResponsibility = () => {
    if (responsibilityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        responsibilities: [...prev.responsibilities, responsibilityInput.trim()],
      }));
      setResponsibilityInput("");
    }
  };

  const removeResponsibility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    const newExperience: WorkExperience = {
      id: editingId || crypto.randomUUID(),
      user_id: "current-user",
      job_title: formData.job_title,
      company_name: formData.company_name,
      location: formData.location,
      start_date: formData.start_date,
      end_date: formData.is_current ? undefined : formData.end_date,
      is_current: formData.is_current,
      description: formData.description,
      responsibilities: formData.responsibilities,
      achievements: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      setExperiences((prev) => prev.map((exp) => (exp.id === editingId ? newExperience : exp)));
    } else {
      setExperiences((prev) => [newExperience, ...prev]);
    }

    resetForm();
  };

  const handleEdit = (experience: WorkExperience) => {
    setFormData({
      job_title: experience.job_title,
      company_name: experience.company_name,
      location: experience.location || "",
      start_date: experience.start_date,
      end_date: experience.end_date || "",
      is_current: experience.is_current,
      description: experience.description || "",
      responsibilities: experience.responsibilities,
    });
    setEditingId(experience.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Work Experience</h1>
            <p className="mt-1 text-gray-600">Add your job history to build stronger resumes</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          )}
        </div>

        {showForm && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-medium">
                {editingId ? "Edit Experience" : "Add New Experience"}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Job Title"
                  value={formData.job_title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, job_title: e.target.value }))}
                  placeholder="e.g., Cashier, Server, Delivery Driver"
                  required
                />
                <Input
                  label="Company Name"
                  value={formData.company_name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, company_name: e.target.value }))
                  }
                  placeholder="e.g., Target, McDonald's"
                  required
                />
              </div>

              <Input
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="City, State"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Start Date"
                  type="month"
                  value={formData.start_date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, start_date: e.target.value }))}
                  required
                />
                {!formData.is_current && (
                  <Input
                    label="End Date"
                    type="month"
                    value={formData.end_date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, end_date: e.target.value }))}
                  />
                )}
              </div>

              <Checkbox
                label="I currently work here"
                checked={formData.is_current}
                onChange={(e) => setFormData((prev) => ({ ...prev, is_current: e.target.checked }))}
              />

              <Textarea
                label="Brief Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Briefly describe your role..."
                rows={3}
              />

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Key Responsibilities
                </label>
                <p className="mb-2 text-sm text-gray-500">
                  Add what you did in this role. Be specific!
                </p>
                <div className="flex gap-2">
                  <Input
                    value={responsibilityInput}
                    onChange={(e) => setResponsibilityInput(e.target.value)}
                    placeholder="e.g., Handled customer transactions"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addResponsibility();
                      }
                    }}
                  />
                  <Button type="button" onClick={addResponsibility} variant="secondary">
                    Add
                  </Button>
                </div>
                {formData.responsibilities.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {formData.responsibilities.map((resp, index) => (
                      <li
                        key={index}
                        className="flex items-start justify-between rounded bg-gray-50 p-2"
                      >
                        <span className="text-sm text-gray-700">{resp}</span>
                        <button
                          type="button"
                          onClick={() => removeResponsibility(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!formData.job_title || !formData.company_name || !formData.start_date}
                >
                  {editingId ? "Update" : "Save"} Experience
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {experiences.length === 0 && !showForm ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No experience added yet</p>
              <p className="mt-1 text-sm text-gray-400">
                Click &quot;Add Experience&quot; to get started
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {experiences.map((experience) => (
              <Card key={experience.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {experience.job_title}
                      </h3>
                      <p className="text-gray-600">{experience.company_name}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(experience.start_date)} -{" "}
                        {experience.is_current ? "Present" : formatDate(experience.end_date || "")}
                        {experience.location && ` • ${experience.location}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(experience)}
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(experience.id)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {experience.description && (
                    <p className="mt-2 text-sm text-gray-600">{experience.description}</p>
                  )}
                  {experience.responsibilities.length > 0 && (
                    <ul className="mt-3 list-inside list-disc space-y-1">
                      {experience.responsibilities.map((resp, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
