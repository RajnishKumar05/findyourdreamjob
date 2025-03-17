"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Building, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Application status variants
const statusVariants = {
  "pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "reviewing": "bg-blue-100 text-blue-800 border-blue-200",
  "interview": "bg-purple-100 text-purple-800 border-purple-200",
  "offered": "bg-green-100 text-green-800 border-green-200",
  "rejected": "bg-red-100 text-red-800 border-red-200",
  "withdrawn": "bg-gray-100 text-gray-800 border-gray-200"
};

// Mock application data (this would be fetched from Firestore in a real app)
const MOCK_APPLICATIONS = [
  {
    id: "app1",
    jobId: "job1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "Remote, India",
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    status: "pending",
    logo: "https://ui-avatars.com/api/?name=TC&background=0D8ABC&color=fff"
  },
  {
    id: "app2",
    jobId: "job2",
    jobTitle: "React Native Developer",
    company: "MobileApp Studios",
    location: "Bangalore, India",
    appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    status: "reviewing",
    logo: "https://ui-avatars.com/api/?name=MA&background=6C5CE7&color=fff"
  },
  {
    id: "app3",
    jobId: "job3",
    jobTitle: "UX/UI Designer",
    company: "Creative Designs",
    location: "Delhi, India",
    appliedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    status: "interview",
    logo: "https://ui-avatars.com/api/?name=CD&background=00B894&color=fff"
  },
  {
    id: "app4",
    jobId: "job4",
    jobTitle: "DevOps Engineer",
    company: "Cloud Systems",
    location: "Hyderabad, India",
    appliedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    status: "rejected",
    logo: "https://ui-avatars.com/api/?name=CS&background=FF7675&color=fff"
  },
  {
    id: "app5",
    jobId: "job5",
    jobTitle: "Product Manager",
    company: "ProductHub",
    location: "Pune, India",
    appliedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    status: "offered",
    logo: "https://ui-avatars.com/api/?name=PH&background=74B9FF&color=fff"
  }
];

// Format date for display
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Get status badge
const StatusBadge = ({ status }: { status: string }) => {
  const variant = statusVariants[status as keyof typeof statusVariants] || statusVariants.pending;
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium border ${variant}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function ApplicationsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [applications] = useState(MOCK_APPLICATIONS);
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, we would fetch applications from Firestore
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // For a real app:
    // const fetchApplications = async () => {
    //   if (!user?.uid) return;
    //   setIsLoading(true);
    //   try {
    //     const applicationsRef = collection(db, "applications");
    //     const q = query(applicationsRef, where("userId", "==", user.uid));
    //     const querySnapshot = await getDocs(q);
    //     const applicationData = querySnapshot.docs.map(doc => ({
    //       id: doc.id,
    //       ...doc.data()
    //     }));
    //     setApplications(applicationData);
    //   } catch (error) {
    //     console.error("Error fetching applications:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchApplications();
  }, [user]);
  
  // Filter applications based on status
  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });
  
  // Group applications by their status
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      
      <Tabs defaultValue="all" className="mb-8" onValueChange={setFilter}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All Applications ({applications.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({statusCounts.pending || 0})
          </TabsTrigger>
          <TabsTrigger value="reviewing">
            Reviewing ({statusCounts.reviewing || 0})
          </TabsTrigger>
          <TabsTrigger value="interview">
            Interview ({statusCounts.interview || 0})
          </TabsTrigger>
          <TabsTrigger value="offered">
            Offered ({statusCounts.offered || 0})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({statusCounts.rejected || 0})
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        </div>
      ) : filteredApplications.length > 0 ? (
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 flex-shrink-0 rounded-md overflow-hidden">
                        <Image 
                          src={application.logo} 
                          alt={application.company} 
                          className="h-full w-full object-cover"
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-medium">{application.jobTitle}</h3>
                          <StatusBadge status={application.status} />
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                          <Building className="h-4 w-4" />
                          <span>{application.company}</span>
                          <span>•</span>
                          <span>{application.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Applied: {formatDate(application.appliedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-center gap-2 md:w-48">
                    <Link href={`/dashboard/jobs/${application.jobId}`}>
                      <Button variant="outline" className="w-full">View Job</Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      Withdraw
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border rounded-lg p-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <AlertCircle className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No applications found</h3>
          <p className="text-gray-500 mb-4">
            {filter === 'all' 
              ? "You haven't applied to any jobs yet." 
              : `You don't have any applications with '${filter}' status.`}
          </p>
          <Link href="/dashboard/jobs">
            <Button>Browse Jobs</Button>
          </Link>
        </div>
      )}
    </div>
  );
} 