"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Briefcase, Building, DollarSign, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "@/components/providers/ProtectedRoute";

// Form schema validation
const jobSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  type: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Remote"]),
  experience: z.enum(["Entry-level", "Mid-level", "Senior", "Executive"]),
  minSalary: z.string().min(1, "Please enter minimum salary"),
  maxSalary: z.string().min(1, "Please enter maximum salary"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string().min(50, "Requirements must be at least 50 characters"),
  responsibilities: z.string().min(50, "Responsibilities must be at least 50 characters"),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function PostJobPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      experience: "Mid-level",
      minSalary: "",
      maxSalary: "",
      description: "",
      requirements: "",
      responsibilities: "",
    },
  });

  const onSubmit = async (values: JobFormValues) => {
    if (!user) {
      setError("You must be logged in to post a job");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      const jobId = uuidv4();
      
      // Create the job document in Firestore
      await setDoc(doc(db, "jobs", jobId), {
        id: jobId,
        userId: user.uid,
        title: values.title,
        company: values.company,
        location: values.location,
        type: values.type,
        experience: values.experience,
        salary: {
          min: values.minSalary,
          max: values.maxSalary,
        },
        description: values.description,
        requirements: values.requirements,
        responsibilities: values.responsibilities,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        applicants: [],
      });

      setSuccess(true);
      
      // Reset form
      form.reset();
      
      // Redirect after a delay
      setTimeout(() => {
        router.push("/dashboard/manage-jobs");
      }, 2000);
      
    } catch (err) {
      console.error("Error posting job:", err);
      setError("Failed to post job. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Post a New Job</h1>
            <p className="text-sm text-muted-foreground">
              Create a new job listing to find the perfect candidates for your position.
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.back()}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            Job posted successfully! Redirecting to manage jobs...
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Enter the details of the job you want to post
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                            <Input 
                              className="pl-9" 
                              placeholder="e.g. Senior Frontend Developer" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                            <Input 
                              className="pl-9" 
                              placeholder="e.g. Acme Inc." 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                            <Input 
                              className="pl-9" 
                              placeholder="e.g. Remote, New York, NY" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type</FormLabel>
                        <FormControl>
                          <select
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            {...field}
                          >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Remote">Remote</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level</FormLabel>
                        <FormControl>
                          <select
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            {...field}
                          >
                            <option value="Entry-level">Entry-level</option>
                            <option value="Mid-level">Mid-level</option>
                            <option value="Senior">Senior</option>
                            <option value="Executive">Executive</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="minSalary"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Min Salary</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                              <Input 
                                type="number" 
                                className="pl-9" 
                                placeholder="e.g. 50000" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxSalary"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Max Salary</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                              <Input 
                                type="number" 
                                className="pl-9" 
                                placeholder="e.g. 80000" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={5}
                          placeholder="Describe the job, its purpose, and the team..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Provide detailed information about the role and company.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={5}
                          placeholder="List the skills, qualifications, and experience required for this role..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Use bullet points or paragraphs to outline the necessary qualifications.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responsibilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsibilities</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={5}
                          placeholder="Outline the key responsibilities and day-to-day tasks..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Describe what the candidate will be doing in this role.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Posting Job..." : "Post Job"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
} 