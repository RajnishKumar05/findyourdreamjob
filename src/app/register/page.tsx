"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ArrowLeft, Building, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Form schema validation
const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.enum(["employer", "employee"], {
    required_error: "Please select a role",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [roleSelected, setRoleSelected] = useState<boolean>(false);

  const initialRole = searchParams.get("role") as "employer" | "employee" | null;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: initialRole || undefined,
    },
  });

  useEffect(() => {
    if (initialRole) {
      setRoleSelected(true);
    }
  }, [initialRole]);

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signUpWithEmail(values.email, values.password, values.role);
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to register. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, we'd need to handle role selection after Google sign-in
      // For now, we'll just sign in and assume the role will be set later
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to sign in with Google. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const selectRole = (role: "employer" | "employee") => {
    form.setValue("role", role);
    setRoleSelected(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-zinc-900" />
            <span className="text-xl font-bold text-zinc-900">JobFinder</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create your account</h1>
            <p className="text-zinc-600 mt-2">Join JobFinder and find your next opportunity</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {!roleSelected ? (
            <div className="space-y-4">
              <p className="text-center text-sm text-zinc-700 mb-4">Select your account type</p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="cursor-pointer hover:border-blue-500 transition-colors" onClick={() => selectRole("employee")}>
                  <CardHeader className="text-center pb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="mt-2">Job Seeker</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-600 text-center">Find jobs and build your career</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:border-blue-500 transition-colors" onClick={() => selectRole("employer")}>
                  <CardHeader className="text-center pb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="mt-2">Employer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-600 text-center">Post jobs and find talent</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {form.getValues("role") === "employer" ? "Employer" : "Job Seeker"} Registration
                  </h2>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setRoleSelected(false)}
                    className="text-zinc-500 hover:text-zinc-900"
                  >
                    Change
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </Form>
          )}
          
          {roleSelected && (
            <>
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-zinc-50 text-zinc-500">Or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleGoogleSignIn()}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign up with Google
              </Button>
            </>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 