"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: ("employer" | "employee")[];
};

export default function ProtectedRoute({ 
  children, 
  allowedRoles 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (!loading && user && allowedRoles) {
      // Check if the user has the required role
      if (!user.role || !allowedRoles.includes(user.role)) {
        router.push("/unauthorized");
      }
    }
  }, [loading, user, router, allowedRoles]);

  // Don't render anything while loading or if no user
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If the user has the required role or no role restriction, render children
  if (!allowedRoles || (user.role && allowedRoles.includes(user.role))) {
    return <>{children}</>;
  }

  // This should not happen due to the useEffect redirect, but just in case
  return null;
} 