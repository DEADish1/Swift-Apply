"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skill } from "@/types";
import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState<Skill["category"]>("technical");

  const addSkill = () => {
    if (skillName.trim()) {
      const newSkill: Skill = {
        id: crypto.randomUUID(),
        user_id: "current-user",
        name: skillName.trim(),
        category: skillCategory,
        created_at: new Date().toISOString(),
      };
      setSkills((prev) => [...prev, newSkill]);
      setSkillName("");
    }
  };

  const removeSkill = (id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  const categoryLabels: Record<string, string> = {
    technical: "Technical Skills",
    soft: "Soft Skills",
    certification: "Certifications",
    tool: "Tools & Software",
  };

  const commonSkills: Record<string, string[]> = {
    technical: ["Cash Handling", "Inventory Management", "Food Safety", "Point of Sale (POS)", "Data Entry", "Microsoft Office", "Google Workspace"],
    soft: ["Customer Service", "Communication", "Teamwork", "Problem Solving", "Time Management", "Attention to Detail", "Adaptability"],
    certification: ["Food Handler's Certificate", "OSHA 10", "CPR/First Aid", "Forklift Certified", "ServSafe"],
    tool: ["Excel", "Word", "Slack", "Square", "Shopify", "QuickBooks", "Salesforce"],
  };

  const addCommonSkill = (name: string, category: Skill["category"]) => {
    const exists = skills.some((s) => s.name.toLowerCase() === name.toLowerCase());
    if (!exists) {
      const newSkill: Skill = {
        id: crypto.randomUUID(),
        user_id: "current-user",
        name,
        category,
        created_at: new Date().toISOString(),
      };
      setSkills((prev) => [...prev, newSkill]);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Skills</h1>
            <p className="mt-1 text-gray-600">Add skills to strengthen your resume</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Skills
            </Button>
          )}
        </div>

        {showForm && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-medium">Add Skills</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <Input
                    label="Skill Name"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    placeholder="e.g., Customer Service, Excel"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                </div>
                <Select
                  label="Category"
                  value={skillCategory}
                  onChange={(e) => setSkillCategory(e.target.value as Skill["category"])}
                  options={[
                    { value: "technical", label: "Technical" },
                    { value: "soft", label: "Soft Skill" },
                    { value: "certification", label: "Certification" },
                    { value: "tool", label: "Tool/Software" },
                  ]}
                />
              </div>
              <Button onClick={addSkill} disabled={!skillName.trim()}>
                Add Skill
              </Button>

              <div className="border-t pt-6">
                <h3 className="mb-4 font-medium text-gray-900">Quick Add Common Skills</h3>
                {Object.entries(commonSkills).map(([category, skillList]) => (
                  <div key={category} className="mb-4">
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      {categoryLabels[category]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => {
                        const isAdded = skills.some(
                          (s) => s.name.toLowerCase() === skill.toLowerCase()
                        );
                        return (
                          <button
                            key={skill}
                            onClick={() => addCommonSkill(skill, category as Skill["category"])}
                            disabled={isAdded}
                            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                              isAdded
                                ? "border-green-200 bg-green-50 text-green-700"
                                : "border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
                            }`}
                          >
                            {isAdded ? "✓ " : "+ "}
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {skills.length === 0 && !showForm ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No skills added yet</p>
              <p className="mt-1 text-sm text-gray-400">
                Click &quot;Add Skills&quot; to get started
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <Card key={category}>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">{categoryLabels[category]}</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                      >
                        {skill.name}
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="ml-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
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
