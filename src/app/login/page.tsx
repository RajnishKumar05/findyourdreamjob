"use client";

import { FirebaseAuth } from "@/components/auth/FirebaseAuth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center">JobFinder</h1>
        <p className="text-gray-600 text-center mt-2">Find your dream job today</p>
      </div>
      
      <FirebaseAuth />
    </div>
  );
} 