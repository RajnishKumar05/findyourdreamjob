"use client";

import React, { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

type NetworkStatusIndicatorProps = {
  className?: string;
};

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

export function NetworkStatusIndicator({ className }: NetworkStatusIndicatorProps) {
  const isOnline = useNetworkStatus();
  const [showIndicator, setShowIndicator] = useState(false);

  // Only show offline indicator
  useEffect(() => {
    if (!isOnline) {
      setShowIndicator(true);
    } else {
      // Hide the indicator after a delay when coming back online
      const timer = setTimeout(() => {
        setShowIndicator(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!showIndicator) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-red-500 px-3 py-1.5 text-white shadow-lg transition-opacity",
        isOnline ? "animate-fade-out" : "animate-fade-in",
        className
      )}
    >
      <WifiOff className="h-4 w-4" />
      <span className="text-sm font-medium">
        {isOnline ? "Back Online" : "You're Offline"}
      </span>
    </div>
  );
} 