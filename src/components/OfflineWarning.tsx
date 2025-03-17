"use client";

import { AlertTriangle, WifiOff, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNetworkStatus } from "./NetworkStatusIndicator";

interface OfflineWarningProps {
  message?: string;
  retry?: () => void;
  showRetry?: boolean;
}

export function OfflineWarning({ 
  message = "You are offline. Some features may be limited.", 
  retry,
  showRetry = true
}: OfflineWarningProps) {
  const isOnline = useNetworkStatus();

  // If online, don't show the warning
  if (isOnline === true) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <WifiOff className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Offline Mode</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{message}</p>
          </div>
          {showRetry && retry && (
            <div className="mt-4">
              <Button
                variant="outline" 
                size="sm"
                onClick={retry}
                className="flex items-center gap-1.5 text-yellow-800 border-yellow-300 hover:bg-yellow-100"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Try again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FirebaseOfflineError({ 
  error, 
  retry,
  children
}: { 
  error: { message?: string; code?: string; isOfflineError?: boolean } | null;
  retry?: () => void;
  children: React.ReactNode;
}) {
  const isOnline = useNetworkStatus();

  // If there's a specific offline error from Firebase
  if (error?.isOfflineError || (error?.message && error.message.includes("offline"))) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Data Unavailable</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error.message || "Unable to fetch data while offline"}</p>
            </div>
            {retry && (
              <div className="mt-4">
                <Button
                  variant="outline" 
                  size="sm"
                  onClick={retry}
                  className="flex items-center gap-1.5 text-red-800 border-red-300 hover:bg-red-100"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Try again
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show offline banner when offline but no specific error
  if (isOnline === false) {
    return (
      <>
        <OfflineWarning retry={retry} />
        {children}
      </>
    );
  }

  // Otherwise, show the children
  return <>{children}</>;
} 