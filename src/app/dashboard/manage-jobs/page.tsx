"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Briefcase, 
  Edit, 
  Eye, 
  Plus, 
  Search, 
  Trash, 
  Users,
  XCircle,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/providers/ProtectedRoute";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import { useFirebaseData } from "@/components/providers/FirebaseDataProvider";
import { FirebaseOfflineError } from "@/components/OfflineWarning";
import { withErrorBoundary } from "@/components/ErrorBoundary";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  status: "active" | "paused" | "closed";
  createdAt: {
    toDate: () => Date;
  };
  applicants: string[];
};

function ManageJobsPage() {
  const { user } = useAuth();
  const { getCollection, isLoading, error, clearError } = useFirebaseData();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "paused" | "closed">("all");

  // Load jobs when component mounts
  useEffect(() => {
    fetchJobs();
  }, [user]);

  // Function to fetch jobs
  const fetchJobs = async () => {
    if (!user) return;

    try {
      clearError();
      const conditions: [string, string, string][] = [["userId", "==", user.uid]];
      const jobsList = await getCollection<Job>("jobs", conditions);
      
      // Sort by creation date (newest first)
      jobsList.sort((a, b) => 
        b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
      );
      
      setJobs(jobsList);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleStatusChange = async (jobId: string, newStatus: "active" | "paused" | "closed") => {
    try {
      const jobRef = doc(db, "jobs", jobId);
      await updateDoc(jobRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      
      // Update local state
      setJobs(jobs.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      ));
    } catch (err) {
      console.error("Error updating job status:", err);
      
      // Optimistic UI update even if API fails (offline)
      setJobs(jobs.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      ));
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      // Remove from local state
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  // Filter jobs based on search term and status
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Count of jobs by status
  const activeJobsCount = jobs.filter(job => job.status === "active").length;
  const pausedJobsCount = jobs.filter(job => job.status === "paused").length;
  const closedJobsCount = jobs.filter(job => job.status === "closed").length;

  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Manage Jobs</h1>
            <p className="text-sm text-muted-foreground">
              View, edit, and manage all your job postings in one place.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/post-job">
              <Plus className="h-4 w-4 mr-2" /> Post New Job
            </Link>
          </Button>
        </div>

        <FirebaseOfflineError error={error} retry={fetchJobs}>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeJobsCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paused Jobs</CardTitle>
                <XCircle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pausedJobsCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Closed Jobs</CardTitle>
                <CheckCircle className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{closedJobsCount}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Job Listings</CardTitle>
              <CardDescription>
                Manage your job postings and track applicants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search jobs..."
                    className="pl-9 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "paused" | "closed")}
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {isLoading ? (
                <div className="text-center py-6">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-zinc-500">Loading your job listings...</p>
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div 
                      key={job.id} 
                      className="border border-zinc-200 rounded-lg p-4 hover:bg-zinc-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-lg truncate">{job.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              job.status === "active" 
                                ? "bg-green-100 text-green-800" 
                                : job.status === "paused"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-zinc-100 text-zinc-800"
                            }`}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-zinc-600">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3.5 w-3.5" /> {job.company}
                            </span>
                            <span>{job.location}</span>
                            <span>{job.type}</span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" /> {job.applicants?.length || 0} applicants
                            </span>
                            <span>Posted {format(job.createdAt.toDate(), 'MMMM d, yyyy')}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/job/${job.id}`}>
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/edit-job/${job.id}`}>
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Link>
                          </Button>
                          {job.status === "active" ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleStatusChange(job.id, "paused")}
                            >
                              <XCircle className="h-4 w-4 mr-1" /> Pause
                            </Button>
                          ) : job.status === "paused" ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleStatusChange(job.id, "active")}
                            >
                              <ArrowUpRight className="h-4 w-4 mr-1" /> Activate
                            </Button>
                          ) : null}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteJob(job.id)}
                          >
                            <Trash className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border border-dashed border-zinc-200 rounded-lg">
                  <Briefcase className="h-10 w-10 mx-auto text-zinc-400" />
                  <h3 className="mt-4 text-lg font-medium">No job listings found</h3>
                  <p className="mt-1 text-zinc-500">
                    {searchTerm || statusFilter !== "all" 
                      ? "Try adjusting your search or filters" 
                      : "Create your first job posting to get started"}
                  </p>
                  {!searchTerm && statusFilter === "all" && (
                    <Button className="mt-4" asChild>
                      <Link href="/dashboard/post-job">
                        <Plus className="h-4 w-4 mr-2" /> Post a Job
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </FirebaseOfflineError>
      </div>
    </ProtectedRoute>
  );
}

export default withErrorBoundary(ManageJobsPage); 