"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Briefcase, 
  Building, 
  Users, 
  TrendingUp, 
  FileText, 
  Calendar,
  Clock,
  CheckCircle2,
  Bell
} from "lucide-react";

export function DashboardStats() {
  const { user } = useAuth();
  const isEmployer = user?.role === "employer";

  const statsCards = isEmployer 
    ? [
        {
          title: "Active Job Listings",
          value: "12",
          icon: <Briefcase className="h-5 w-5 text-blue-600" />,
          change: "+2 from last month",
          changeType: "positive"
        },
        {
          title: "Total Applicants",
          value: "142",
          icon: <Users className="h-5 w-5 text-indigo-600" />,
          change: "+24 in the last week",
          changeType: "positive"
        },
        {
          title: "Job Views",
          value: "2,651",
          icon: <TrendingUp className="h-5 w-5 text-emerald-600" />,
          change: "+18% from last month",
          changeType: "positive"
        },
        {
          title: "New Messages",
          value: "8",
          icon: <Bell className="h-5 w-5 text-amber-600" />,
          change: "+3 unread",
          changeType: "neutral"
        }
      ]
    : [
        {
          title: "Applied Jobs",
          value: "7",
          icon: <Briefcase className="h-5 w-5 text-blue-600" />,
          change: "+2 this week",
          changeType: "positive"
        },
        {
          title: "Profile Views",
          value: "36",
          icon: <Users className="h-5 w-5 text-indigo-600" />,
          change: "+15% from last month",
          changeType: "positive"
        },
        {
          title: "Saved Jobs",
          value: "12",
          icon: <FileText className="h-5 w-5 text-emerald-600" />,
          change: "4 new matches",
          changeType: "positive"
        },
        {
          title: "Interviews",
          value: "2",
          icon: <Calendar className="h-5 w-5 text-amber-600" />,
          change: "Next: Tomorrow, 10 AM",
          changeType: "neutral"
        }
      ];

  const getChangeColorClass = (type: string) => {
    switch (type) {
      case "positive":
        return "text-emerald-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-zinc-600";
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((card, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-2 pt-4 px-5 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-700">
              {card.title}
            </CardTitle>
            <div className="h-8 w-8 rounded-md bg-zinc-100/80 flex items-center justify-center">
              {card.icon}
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <div className="text-2xl font-bold">{card.value}</div>
            <p className={`text-xs mt-1 ${getChangeColorClass(card.changeType)}`}>
              {card.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function EmployerDashboardActivity() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Recent Applications</CardTitle>
          <p className="text-sm text-zinc-500">
            You have received 16 applications this week
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4 border-b border-zinc-200 pb-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-zinc-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">John Doe</h4>
                    <span className="text-xs text-zinc-500">2 days ago</span>
                  </div>
                  <p className="text-sm text-zinc-600 mt-1">Applied for Senior Developer position</p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      React
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      Next.js
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
          <p className="text-sm text-zinc-500">
            You have 3 tasks for today
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Clock className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="font-medium">Review applications</p>
                <p className="text-sm text-zinc-500">Frontend Developer - 12 applicants</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <p className="font-medium">Schedule interviews</p>
                <p className="text-sm text-zinc-500">5 candidates shortlisted</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <FileText className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">Update job descriptions</p>
                <p className="text-sm text-zinc-500">3 postings need updates</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function JobSeekerDashboardActivity() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Recommended Jobs</CardTitle>
          <p className="text-sm text-zinc-500">
            Based on your profile and preferences
          </p>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4 border-b border-zinc-200 pb-4">
                <div className="w-10 h-10 rounded-md bg-zinc-100 flex items-center justify-center">
                  <Building className="h-5 w-5 text-zinc-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Frontend Developer</h4>
                    <span className="text-xs text-zinc-500">3 days ago</span>
                  </div>
                  <p className="text-sm text-zinc-600 mt-1">Company {i} · Remote · ₹80k-₹120k</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded-full">React</span>
                    <span className="text-xs bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded-full">Next.js</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile Completion</CardTitle>
          <p className="text-sm text-zinc-500">
            Complete your profile to get more job matches
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Profile</span>
                <span className="text-sm text-zinc-500">75%</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Resume</span>
                <span className="text-sm text-zinc-500">90%</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Skills</span>
                <span className="text-sm text-zinc-500">60%</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div className="mt-3 text-sm text-zinc-600">
              <p>Add your work history and update your skills to improve your profile.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 