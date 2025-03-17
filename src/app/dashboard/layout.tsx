"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { OfflineWarning } from "@/components/OfflineWarning";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  
  // Enable for testing - bypass authentication check
  const bypassAuthForTesting = true;
  
  useEffect(() => {
    // Add a safety timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setIsReady(true);
    }, 3000);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  // Use useEffect to perform redirection client-side after hydration
  useEffect(() => {
    if (!loading && !user && !bypassAuthForTesting) {
      redirect("/login");
    }
    
    if (!loading) {
      setIsReady(true);
    }
  }, [user, loading, bypassAuthForTesting]);

  // Show loading indicator while auth is being checked
  if (loading && !isReady) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  // Don't render dashboard UI if not logged in and not bypassing auth
  if (!user && !bypassAuthForTesting) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          <OfflineWarning />
          {children}
        </main>
      </div>
    </div>
  );
} 