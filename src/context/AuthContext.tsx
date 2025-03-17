"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// User type with role
type UserWithRole = User & {
  role?: "employer" | "employee";
};

// Auth context types
type AuthContextType = {
  user: UserWithRole | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  signUpWithEmail: (email: string, password: string, role: "employer" | "employee") => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [loading, setLoading] = useState(true);

  // Sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Check if user exists in Firestore
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);
      
      // If new user, prompt for role selection (handled in UI)
      if (!userSnap.exists()) {
        // We'll set default role here, but UI will prompt user to select
        const userData = {
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
          role: "employee", // Default role
          createdAt: new Date().toISOString(),
        };
        await setDoc(userRef, userData);
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  // Sign up with email/password
  const signUpWithEmail = async (email: string, password: string, role: "employer" | "employee") => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Create user in Firestore with role
      const userRef = doc(db, "users", result.user.uid);
      const userData = {
        email: result.user.email,
        role: role,
        createdAt: new Date().toISOString(),
      };
      await setDoc(userRef, userData);
    } catch (error) {
      console.error("Error signing up with email", error);
      throw error;
    }
  };

  // Login with email/password
  const loginWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error logging in with email", error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // Get user data including role from Firestore
        const userRef = doc(db, "users", authUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const userWithRole = {
            ...authUser,
            role: userData.role,
          } as UserWithRole;
          
          setUser(userWithRole);
        } else {
          setUser(authUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signInWithGoogle, 
      logout,
      signUpWithEmail,
      loginWithEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 