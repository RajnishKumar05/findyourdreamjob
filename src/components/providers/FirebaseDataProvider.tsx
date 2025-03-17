"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { 
  collection, query, where, getDocs, getDoc, doc,
  WhereFilterOp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useNetworkStatus } from "../NetworkStatusIndicator";

// Type for error structure
type FirebaseError = {
  message: string;
  code: string;
  isOfflineError?: boolean;
};

// Context type
type FirebaseDataContextType = {
  getCollection: <T>(
    collectionName: string,
    conditions?: [string, WhereFilterOp, unknown][] | null
  ) => Promise<T[]>;
  getDocument: <T>(collectionName: string, docId: string) => Promise<T | null>;
  isLoading: boolean;
  error: FirebaseError | null;
  clearError: () => void;
};

// Create context
const FirebaseDataContext = createContext<FirebaseDataContextType | null>(null);

// Provider props
type FirebaseDataProviderProps = {
  children: ReactNode;
};

export function FirebaseDataProvider({ children }: FirebaseDataProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FirebaseError | null>(null);
  const isOnline = useNetworkStatus();

  // Initialize offline persistence - only run once
  useEffect(() => {
    // Skip if offline persistence is already enabled in firebase.ts
    // This avoids duplicate calls
  }, []);

  const clearError = () => setError(null);

  const handleError = (error: unknown) => {
    console.error("Firebase error:", error);
    
    const err = error as { message?: string; code?: string };
    
    // Check if it's an offline error
    const isOfflineError = err.message?.includes("offline") || 
                          err.code === "unavailable" ||
                          (isOnline === false && err.code?.includes("network"));
    
    setError({
      message: err.message || "Unknown error occurred",
      code: err.code || "unknown",
      isOfflineError
    });
    
    return error;
  };

  const getCollection = async <T,>(
    collectionName: string,
    conditions: [string, WhereFilterOp, unknown][] | null = null
  ): Promise<T[]> => {
    setIsLoading(true);
    clearError();
    
    try {
      const collectionRef = collection(db, collectionName);
      let querySnapshot;
      
      if (conditions && conditions.length > 0) {
        const filters = conditions.map(
          ([field, operator, value]) => where(field, operator, value)
        );
        const q = query(collectionRef, ...filters);
        querySnapshot = await getDocs(q);
      } else {
        querySnapshot = await getDocs(collectionRef);
      }
      
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
      
      return results;
    } catch (error: unknown) {
      handleError(error);
      return []; // Return empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const getDocument = async <T,>(
    collectionName: string,
    docId: string
  ): Promise<T | null> => {
    setIsLoading(true);
    clearError();
    
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as T;
      }
      
      return null;
    } catch (error: unknown) {
      handleError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    getCollection,
    getDocument,
    isLoading,
    error,
    clearError,
  };

  return (
    <FirebaseDataContext.Provider value={value}>
      {children}
    </FirebaseDataContext.Provider>
  );
}

// Custom hook to use the Firebase Data context
export const useFirebaseData = () => {
  const context = useContext(FirebaseDataContext);
  
  if (!context) {
    throw new Error("useFirebaseData must be used within a FirebaseDataProvider");
  }
  
  return context;
}; 