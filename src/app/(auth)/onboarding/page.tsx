"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface OnboardingData {
  full_name: string;
  phone: string;
  location: string;
  zip_code: string;
  preferred_radius: number;
  willing_to_relocate: boolean;
  open_to_remote: boolean;
  preferred_job_titles: string[];
  salary_min: number;
  salary_max: number;
  schedule_preference: string;
  employment_type: string[];
}

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Location" },
  { id: 3, name: "Job Preferences" },
  { id: 4, name: "Schedule & Pay" },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState<OnboardingData>({
    full_name: "",
    phone: "",
    location: "",
    zip_code: "",
    preferred_radius: 25,
    willing_to_relocate: false,
    open_to_remote: true,
    preferred_job_titles: [],
    salary_min: 0,
    salary_max: 0,
    schedule_preference: "flexible",
    employment_type: ["full-time"],
  });

  const [jobTitleInput, setJobTitleInput] = useState("");

  const router = useRouter();

  const updateData = (field: keyof OnboardingData, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const addJobTitle = () => {
    if (jobTitleInput.trim() && !data.preferred_job_titles.includes(jobTitleInput.trim())) {
      updateData("preferred_job_titles", [...data.preferred_job_titles, jobTitleInput.trim()]);
      setJobTitleInput("");
    }
  };

  const removeJobTitle = (title: string) => {
    updateData(
      "preferred_job_titles",
      data.preferred_job_titles.filter((t) => t !== title)
    );
  };

  const toggleEmploymentType = (type: string) => {
    const types = data.employment_type.includes(type)
      ? data.employment_type.filter((t) => t !== type)
      : [...data.employment_type, type];
    updateData("employment_type", types);
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Not authenticated");
        return;
      }

      // In a real app, save to database
      // For now, we'll just mark onboarding as complete
      console.log("Onboarding data:", data);

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            Swift Apply
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">
            Let&apos;s set up your profile
          </h1>
          <p className="mt-2 text-gray-600">This helps us find the best jobs for you</p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    currentStep > step.id
                      ? "bg-green-500 text-white"
                      : currentStep === step.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle className="h-6 w-6" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-2 h-1 w-16 ${
                      currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-sm">
            {steps.map((step) => (
              <span
                key={step.id}
                className={currentStep === step.id ? "font-medium text-blue-600" : "text-gray-500"}
              >
                {step.name}
              </span>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Tell us about yourself</h2>
                <Input
                  label="Full Name"
                  value={data.full_name}
                  onChange={(e) => updateData("full_name", e.target.value)}
                  placeholder="Your full name"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => updateData("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Where are you located?</h2>
                <Input
                  label="City, State"
                  value={data.location}
                  onChange={(e) => updateData("location", e.target.value)}
                  placeholder="e.g., Austin, TX"
                />
                <Input
                  label="ZIP Code"
                  value={data.zip_code}
                  onChange={(e) => updateData("zip_code", e.target.value)}
                  placeholder="12345"
                />
                <Select
                  label="How far are you willing to commute?"
                  value={String(data.preferred_radius)}
                  onChange={(e) => updateData("preferred_radius", Number(e.target.value))}
                  options={[
                    { value: "5", label: "5 miles" },
                    { value: "10", label: "10 miles" },
                    { value: "25", label: "25 miles" },
                    { value: "50", label: "50 miles" },
                    { value: "100", label: "100+ miles" },
                  ]}
                />
                <Checkbox
                  label="I'm open to relocating"
                  checked={data.willing_to_relocate}
                  onChange={(e) => updateData("willing_to_relocate", e.target.checked)}
                />
                <Checkbox
                  label="I'm interested in remote work"
                  checked={data.open_to_remote}
                  onChange={(e) => updateData("open_to_remote", e.target.checked)}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">What jobs are you looking for?</h2>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Add job titles you&apos;re interested in
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={jobTitleInput}
                      onChange={(e) => setJobTitleInput(e.target.value)}
                      placeholder="e.g., Cashier, Delivery Driver"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addJobTitle();
                        }
                      }}
                    />
                    <Button type="button" onClick={addJobTitle} variant="secondary">
                      Add
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {data.preferred_job_titles.map((title) => (
                      <span
                        key={title}
                        className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                      >
                        {title}
                        <button
                          type="button"
                          onClick={() => removeJobTitle(title)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Employment type (select all that apply)
                  </label>
                  <div className="space-y-2">
                    <Checkbox
                      label="Full-time"
                      checked={data.employment_type.includes("full-time")}
                      onChange={() => toggleEmploymentType("full-time")}
                    />
                    <Checkbox
                      label="Part-time"
                      checked={data.employment_type.includes("part-time")}
                      onChange={() => toggleEmploymentType("part-time")}
                    />
                    <Checkbox
                      label="Contract"
                      checked={data.employment_type.includes("contract")}
                      onChange={() => toggleEmploymentType("contract")}
                    />
                    <Checkbox
                      label="Temporary"
                      checked={data.employment_type.includes("temporary")}
                      onChange={() => toggleEmploymentType("temporary")}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Schedule & Pay Preferences</h2>
                <Select
                  label="Preferred schedule"
                  value={data.schedule_preference}
                  onChange={(e) => updateData("schedule_preference", e.target.value)}
                  options={[
                    { value: "day", label: "Day shift" },
                    { value: "night", label: "Night shift" },
                    { value: "flexible", label: "Flexible hours" },
                    { value: "any", label: "Any schedule" },
                  ]}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Minimum hourly rate ($)"
                    type="number"
                    value={data.salary_min || ""}
                    onChange={(e) => updateData("salary_min", Number(e.target.value))}
                    placeholder="15"
                    min="0"
                  />
                  <Input
                    label="Maximum hourly rate ($)"
                    type="number"
                    value={data.salary_max || ""}
                    onChange={(e) => updateData("salary_max", Number(e.target.value))}
                    placeholder="25"
                    min="0"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Leave blank if you&apos;re open to any pay range
                </p>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
            )}

            <div className="mt-6 flex justify-between">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < steps.length ? (
                <Button type="button" onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="button" onClick={handleComplete} disabled={loading}>
                  {loading ? "Saving..." : "Complete Setup"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
