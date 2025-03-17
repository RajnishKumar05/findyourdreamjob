"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function ResumePage() {
  useEffect(() => {
    redirect("/dashboard/resume-builder");
  }, []);
  
  // Fallback UI while client-side redirect happens
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
    </div>
  );
} 