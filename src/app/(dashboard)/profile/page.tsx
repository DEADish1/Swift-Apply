"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase, GraduationCap, Star, User } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-1 text-gray-600">Manage your information to build better resumes</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/profile/experience">
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Work Experience</h3>
                    <p className="text-sm text-gray-500">Add your job history</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Add your past jobs, responsibilities, and achievements. This information will be
                  used to generate strong resume bullet points.
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Manage Experience
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/profile/skills">
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <Star className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Skills</h3>
                    <p className="text-sm text-gray-500">Technical and soft skills</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  List your skills including technical abilities, soft skills, certifications, and
                  tools you know how to use.
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Manage Skills
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/profile/education">
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Education</h3>
                    <p className="text-sm text-gray-500">Schools and certifications</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Add your educational background including high school, college, trade schools, or
                  any relevant training programs.
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Manage Education
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/profile/preferences">
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                    <User className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Preferences</h3>
                    <p className="text-sm text-gray-500">Job search settings</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Update your contact information, location preferences, desired salary range, and
                  schedule availability.
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Update Preferences
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
