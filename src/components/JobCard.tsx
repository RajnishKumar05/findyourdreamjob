"use client";

import React from "react";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  Banknote,
  CalendarDays,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  salary: string;
  postedAt: Date;
  skills: string[];
  logo?: string;
  featured?: boolean;
}

// Custom date formatting function
function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
}

// Custom time ago function
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  
  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
}

interface JobCardProps {
  job: Job;
  variant?: "default" | "compact";
}

export function JobCard({ job, variant = "default" }: JobCardProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "relative group rounded-lg border p-4 bg-white shadow-sm hover:shadow-md transition duration-200",
        job.featured &&
          "border-l-4 border-l-blue-600 bg-blue-50/40 hover:bg-blue-50/80",
        isCompact ? "p-3" : "p-4"
      )}
    >
      {job.featured && (
        <Badge className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-blue-600">
          Featured
        </Badge>
      )}

      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex-shrink-0 rounded bg-gray-100 flex items-center justify-center border overflow-hidden",
            isCompact ? "w-10 h-10" : "w-14 h-14"
          )}
        >
          {job.logo ? (
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <Building2
              className={cn(
                "text-gray-400",
                isCompact ? "h-6 w-6" : "h-8 w-8"
              )}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <Link
              href={`/dashboard/jobs/${job.id}`}
              className="text-lg font-medium text-blue-600 hover:underline"
            >
              {job.title}
            </Link>
            <span
              className={cn(
                "text-gray-600",
                isCompact ? "text-sm" : "text-base"
              )}
            >
              {job.company}
            </span>
          </div>

          <div
            className={cn(
              "grid gap-y-1 text-sm text-gray-500 mt-2",
              isCompact ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            )}
          >
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">{job.location}</span>
            </div>

            <div className="flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{job.type}</span>
            </div>

            <div className="flex items-center gap-1">
              <Banknote className="h-3.5 w-3.5" />
              <span>{job.salary}</span>
            </div>
          </div>

          {!isCompact && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {job.skills.slice(0, 3).map((skill, i) => (
                <Badge key={i} variant="secondary">
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 3 && (
                <Badge variant="outline">+{job.skills.length - 3}</Badge>
              )}
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex flex-col gap-2 items-end",
            isCompact ? "ml-auto" : ""
          )}
        >
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{formatDate(job.postedAt)}</span>
          </div>
          <div className="text-xs text-gray-400 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{getTimeAgo(job.postedAt)}</span>
          </div>
          {!isCompact && (
            <Button className="mt-3" size={isCompact ? "sm" : "default"}>
              Apply Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 