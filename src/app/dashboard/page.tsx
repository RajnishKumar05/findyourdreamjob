"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, MapPin, BarChart, UserCircle, Search } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <UserCircle className="h-10 w-10 text-blue-500" />
          <div>
            <p className="font-medium">Welcome back</p>
            <p className="text-sm text-gray-500">Job Seeker</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Job Search */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-500" />
              Job Search
            </CardTitle>
            <CardDescription>Find jobs matching your skills and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Browse through thousands of job listings and filter by location, salary, and more.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/jobs" className="w-full">
              <Button className="w-full">Browse Jobs</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Job Map */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              Job Map
            </CardTitle>
            <CardDescription>Find jobs nearby your location</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              View jobs on an interactive map and discover opportunities in your area.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/job-map" className="w-full">
              <Button className="w-full">View Map</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Resume Builder */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Resume Builder
            </CardTitle>
            <CardDescription>Create and manage your professional resume</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Build an impressive resume with our easy-to-use builder and downloadable templates.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/resume-builder" className="w-full">
              <Button className="w-full">Build Resume</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Applications */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              Applications
            </CardTitle>
            <CardDescription>Track your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Monitor the status of your applications and set reminders for follow-ups.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/applications" className="w-full">
              <Button className="w-full">View Applications</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Analytics */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-500" />
              Analytics
            </CardTitle>
            <CardDescription>Insights about your job search</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              View statistics about your applications, interviews, and job search progress.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/analytics" className="w-full">
              <Button className="w-full">View Analytics</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li className="text-gray-700">Update your profile with your skills and experience</li>
          <li className="text-gray-700">Build a professional resume using our Resume Builder</li>
          <li className="text-gray-700">Browse and apply for jobs that match your qualifications</li>
          <li className="text-gray-700">Track your applications and set reminders for follow-ups</li>
          <li className="text-gray-700">Monitor your progress with analytics and improve your strategy</li>
        </ol>
      </div>
    </div>
  );
} 